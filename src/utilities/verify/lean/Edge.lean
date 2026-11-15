/-
  Edge — which request the Worker stops before the app runs, and which it only counts.

  Clay: none

  worker.ts sees every request before OpenNext and Payload start, so a request refused there costs
  almost nothing. Two Cloudflare bindings act at that point: RATE_LIMITER_API counts requests per key
  and refuses a key past its budget (100 per 60 s, wrangler.jsonc), and ANALYTICS_API records one data
  point per request. This file is the decision of which requests are LIMITED and under which key; the
  twin, src/utilities/edge, parses a request into a Shape and applies the same table in worker.ts.

  A request has a shape: whether its path is under /api, whether it is the MCP gateway (/mcp,
  /api/mcp), whether it is a sign-in endpoint (login, first-register, forgot-password, reset-password,
  refresh-token, unlock, verify, and the MCP OAuth endpoints), and its method. Its class:

    · auth    a sign-in endpoint, whatever the method         limited
    · agent   the MCP gateway                                 limited
    · write   any other non-GET/HEAD request under /api       limited
    · read    a GET or HEAD under /api                        counted, never limited
    · page    anything else (the site, the admin UI)          counted, never limited

  Reads are not limited because one admin page view issues dozens of them: a budget of 100 a minute
  would throttle the people using erpax, while the abuse worth refusing early (guessing passwords,
  bulk writes, runaway agents) is in the limited classes. The key is the class and the client, so a
  burst of reads or writes never spends a client's budget for signing in.

  What is proved, by `decide` over every shape (2 × 2 × 2 × 7 methods):
    1. Every sign-in shape is auth, whatever its method.
    2. A page or a read is never limited; auth, agent and write always are.
    3. A non-sign-in request under /api that is not a GET or HEAD is limited.
    4. Different classes have different key prefixes, so their budgets never mix.
-/

namespace Edge

inductive Method where
  | get | head | post | put | patch | delete | options
  deriving DecidableEq, Repr

structure Shape where
  api : Bool
  mcp : Bool
  auth : Bool
  method : Method
  deriving DecidableEq

inductive Cls where
  | page | read | write | auth | agent
  deriving DecidableEq, Repr

/-- GET and HEAD read; every other method writes. Total, without a wildcard, so `decide` over it rests
    on no axiom. -/
def reads : Method → Bool
  | .get => true | .head => true
  | .post => false | .put => false | .patch => false | .delete => false | .options => false

/-- The class of a request. -/
def classify (s : Shape) : Cls :=
  if s.auth then .auth
  else if s.mcp then .agent
  else if !s.api then .page
  else if reads s.method then .read
  else .write

/-- Whether the edge counts this class against a budget. -/
def limited : Cls → Bool
  | .page => false | .read => false
  | .write => true | .auth => true | .agent => true

/-- The key prefix of a class (the key is prefix:client). -/
def prefixOf : Cls → Nat
  | .page => 0 | .read => 1 | .write => 2 | .auth => 3 | .agent => 4

def methods : List Method := [.get, .head, .post, .put, .patch, .delete, .options]
def bools : List Bool := [false, true]

/-- Every shape: 2 × 2 × 2 × 7 = 56. -/
def shapes : List Shape :=
  bools.flatMap fun api => bools.flatMap fun mcp => bools.flatMap fun auth => methods.map fun method => ⟨api, mcp, auth, method⟩

def classes : List Cls := [.page, .read, .write, .auth, .agent]

theorem every_shape_counted : shapes.length = 56 := by decide

theorem sign_in_is_auth_whatever_the_method : shapes.all (fun s => !s.auth || classify s == .auth) = true := by decide

theorem pages_and_reads_are_never_limited :
    shapes.all (fun s => !(classify s == .page || classify s == .read) || !limited (classify s)) = true := by decide

theorem auth_agent_write_are_limited :
    shapes.all (fun s => !(classify s == .auth || classify s == .agent || classify s == .write) || limited (classify s)) = true := by decide

theorem api_writes_are_limited :
    shapes.all (fun s => !(s.api && !s.auth && !s.mcp && !reads s.method) || limited (classify s)) = true := by decide

theorem class_keys_never_mix :
    classes.all (fun a => classes.all (fun b => a == b || prefixOf a != prefixOf b)) = true := by decide

end Edge

/**
 * translation/source/verified — the sense-VERIFIED harvest SNAPSHOT (Wikidata CC0, 2026-07-15).
 *
 * REAL multilingual renderings for 27 unambiguous single-word concept atoms (anatomy · nature ·
 * matter), each harvested LIVE from Wikidata and admitted ONLY because a candidate concept's English
 * description sense-matched the atom's own meaning (../index#harvestVerified · senseScore ≥ 0.14). Every
 * rendering is traceable to a CC0 Wikidata Qid (see VERIFIED_PROVENANCE) — NEVER fabricated, NEVER guessed.
 *
 * The gate REJECTED the wrong senses the top-1 search would have poisoned us with (2026-07-15 live):
 * `law→family name`, `balance→Van Halen album`, `gold→family name`, `apple→Apple Inc`. It also left
 * honest seed-GAPS where even a deeper search found no sense-clearing candidate (brain, chest) or the correct
 * Qid scored below threshold (eye Q7364 0.091 · sugar Q11002 0.100) — a gap is better than a wrong sense.
 *
 * This is the training set the coverage metric moves on: ../..#trainingCoverage over these renderings reads
 * ~29/30 (vs the corpus catalogue's 1/30 en-only source). Seeded into the `translations` collection by
 * ../../../translations/seed. A snapshot, like a sealed CC0 dump — re-harvest to refresh; Qids are stable.
 *
 * @standard Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags · RFC 9562 §5.8 content-uuid
 * @see ../index (harvestVerified · the sense gate) · ../../index (the translation model) · ./SKILL.md
 */
import { defineTranslation, type TranslationTable } from '@/translation'

/** Provenance for every registered concept — the CC0 Wikidata Qid + gloss + sense-match score it cleared. */
export interface Provenance {
  readonly concept: string
  readonly qid: string
  readonly score: number
  readonly description: string
}

/** The sense-match audit trail — every rendering below is admitted by exactly one of these Qids. */
export const VERIFIED_PROVENANCE: readonly Provenance[] = [
  { concept: "heart", qid: "Q1072", score: 0.222, description: "inner organ for the circulation of blood" },
  { concept: "lung", qid: "Q7886", score: 0.4, description: "essential respiration organ in many air-breathing animals" },
  { concept: "blood", qid: "Q7873", score: 0.222, description: "organic fluid which transports nutrients throughout the organism" },
  { concept: "skin", qid: "Q1074", score: 0.429, description: "soft outer covering organ of vertebrates" },
  { concept: "bone", qid: "Q265868", score: 0.5, description: "rigid organ that constitutes part of the endoskeleton of vertebrates" },
  { concept: "muscle", qid: "Q7365", score: 0.286, description: "contractile soft tissue of animals" },
  { concept: "nerve", qid: "Q9620", score: 0.273, description: "enclosed, cable-like bundle of axons in the peripheral nervous system" },
  { concept: "artery", qid: "Q9655", score: 0.455, description: "blood vessel that carries oxygenated blood away from the heart to other organs rather than lungs" },
  { concept: "vein", qid: "Q9609", score: 0.4, description: "blood vessel that carry deoxygenated blood towards the heart, with the exception of the pulmonary vein" },
  { concept: "foot", qid: "Q15807", score: 0.2, description: "weight-bearing anatomical structure found in vertebrates" },
  { concept: "hand", qid: "Q33767", score: 0.286, description: "extremity at the end of an arm or forelimb" },
  { concept: "ear", qid: "Q7362", score: 0.5, description: "organ that detects sound; organ of hearing and balance" },
  { concept: "nose", qid: "Q7363", score: 0.286, description: "organ that smells and facilitates breathing" },
  { concept: "hair", qid: "Q28472", score: 0.5, description: "protein filament that grows from follicles found in the dermis, or skin" },
  { concept: "neck", qid: "Q9633", score: 0.333, description: "part of the body, on many terrestrial or secondarily aquatic vertebrates, that distinguishes the head from the torso or trunk" },
  { concept: "abdomen", qid: "Q9597", score: 0.294, description: "in humans, region of the body between the thorax at the top and the pelvis at the bottom; in insects, segment at the caudal end of the body, following on from the head and thorax" },
  { concept: "water", qid: "Q283", score: 0.364, description: "chemical compound whose molecules are formed by two hydrogen atoms and one oxygen atom" },
  { concept: "star", qid: "Q523", score: 0.636, description: "astronomical object consisting of a luminous spheroid of plasma held together by its own gravity" },
  { concept: "sea", qid: "Q165", score: 0.6, description: "large body of saline water" },
  { concept: "river", qid: "Q4022", score: 0.333, description: "larger natural watercourse" },
  { concept: "lake", qid: "Q23397", score: 0.25, description: "body of relatively still water, localized in a basin" },
  { concept: "ocean", qid: "Q9430", score: 0.3, description: "very large body of saline water" },
  { concept: "fire", qid: "Q3196", score: 0.2, description: "rapid oxidation of a material; phenomenon that emits light and heat" },
  { concept: "ice", qid: "Q23392", score: 0.8, description: "water frozen into the solid state" },
  { concept: "mountain", qid: "Q8502", score: 0.833, description: "large natural elevation of the Earth's surface" },
  { concept: "gas", qid: "Q11432", score: 0.154, description: "fundamental state of matter in which constituent particles are widely separated with weak intermolecular bonds" },
  { concept: "animal", qid: "Q729", score: 0.5, description: "kingdom of multicellular eukaryotic organisms" },
]

/**
 * The verified renderings — a real TranslationTable. `en` is the atom word (the source); the other locales
 * are Wikidata's community labels for the sense-matched Qid. 762 non-en renderings across 27 concepts.
 */
export const VERIFIED_RENDERINGS: TranslationTable = [
  defineTranslation("heart", "heart", {"bg":"сърце","cs":"srdce","da":"hjerte","de":"Herz","el":"καρδιά","es":"corazón","et":"süda","fi":"sydän","fr":"cœur","ga":"croí","hr":"srce","hu":"szív","is":"hjarta","it":"cuore","ja":"心臓","lt":"širdis","lv":"sirds","mt":"qalb","nb":"hjerte","nl":"hart","pl":"serce","pt":"coração","ro":"inimă","ru":"сердце","sk":"srdce","sl":"srce","sv":"hjärta","uk":"серце","ar":"قلب"}),
  defineTranslation("lung", "lung", {"bg":"бял дроб","cs":"plíce","da":"lunge","de":"Lunge","el":"πνεύμονας","es":"pulmón","et":"kopsud","fi":"keuhkot","fr":"poumon","ga":"scamhóg","hr":"pluća","hu":"tüdő","is":"lunga","it":"polmone","ja":"肺","lt":"plaučiai","lv":"plaušas","mt":"pulmun","nb":"lunge","nl":"long","pl":"płuco","pt":"pulmão","ro":"plămân","ru":"лёгкие","sk":"pľúca","sl":"pljuča","sv":"lunga","uk":"легені","ar":"رئة"}),
  defineTranslation("blood", "blood", {"bg":"Кръв","cs":"krev","da":"blod","de":"Blut","el":"αίμα","es":"sangre","et":"veri","fi":"veri","fr":"sang","ga":"fuil","hr":"krv","hu":"vér","is":"blóð","it":"sangue","ja":"血液","lt":"kraujas","lv":"asinis","mt":"demm","nb":"blod","nl":"bloed","pl":"krew","pt":"sangue","ro":"sânge","ru":"кровь","sk":"krv","sl":"kri","sv":"blod","uk":"кров","ar":"دم"}),
  defineTranslation("skin", "skin", {"bg":"кожа","cs":"kůže","da":"hud","de":"Haut","el":"δέρμα","es":"piel","et":"nahk","fi":"iho","fr":"peau","ga":"craiceann","hr":"koža","hu":"bőr","is":"húð","it":"pelle","ja":"皮膚","lt":"oda","lv":"āda","nb":"hud","nl":"huid","pl":"skóra","pt":"pele","ro":"piele","ru":"кожа","sk":"koža","sl":"koža","sv":"hud","uk":"шкіра","ar":"جلد"}),
  defineTranslation("bone", "bone", {"bg":"Кост","cs":"kost","da":"knogle","de":"Knochen","el":"οστό","es":"hueso","et":"luu","fi":"luu","fr":"os","ga":"cnámh","hr":"kost","hu":"csont","is":"Bein","it":"osso","ja":"骨","lt":"kaulas","lv":"kauls","nb":"knokkel","nl":"bot","pl":"kość","pt":"osso","ro":"Os","ru":"кость","sk":"kosť","sl":"kost","sv":"ben","uk":"кістка","ar":"عظم"}),
  defineTranslation("muscle", "muscle", {"bg":"Мускул","cs":"sval","da":"muskel","de":"Muskel","el":"μυς","es":"músculo","et":"Lihas","fi":"lihas","fr":"muscle","ga":"matán","hr":"mišić","hu":"izom","is":"Vöðvi","it":"muscolo","ja":"筋肉","lt":"raumuo","lv":"muskuļi","nb":"muskel","nl":"spier","pl":"mięsień","pt":"músculo","ro":"mușchi","ru":"мышца","sk":"sval","sl":"mišica","sv":"muskel","uk":"м’язи","ar":"عضلة"}),
  defineTranslation("nerve", "nerve", {"bg":"Нерв","cs":"nerv","da":"nerve","de":"Nerv","el":"Νεύρο","es":"nervio","et":"närv","fi":"hermo","fr":"nerf","ga":"néaróg","hr":"živac","hu":"ideg","is":"Taug","it":"nervo","ja":"神経","lt":"nervas","lv":"Nervs","nb":"nerve","nl":"zenuw","pl":"nerw","pt":"nervo","ro":"nerv","ru":"нерв","sk":"Nerv","sl":"živec","sv":"nerv","uk":"нерв","ar":"عصب"}),
  defineTranslation("artery", "artery", {"bg":"Артерия","cs":"tepna","da":"arterie","de":"Arterie","el":"αρτηρία","es":"arteria","et":"arter","fi":"valtimo","fr":"artère","ga":"artaire","hr":"arterija","hu":"artéria","is":"slagæð","it":"arteria","ja":"動脈","lt":"arterija","lv":"artērija","nb":"arterie","nl":"slagader","pl":"tętnica","pt":"artéria","ro":"arteră","ru":"артерия","sk":"tepna","sl":"arterija","sv":"artär","uk":"артерія","ar":"شريان"}),
  defineTranslation("vein", "vein", {"bg":"Вена","cs":"žíla","da":"Vene","de":"Vene","el":"Φλέβα","es":"vena","et":"Veen","fi":"Laskimo","fr":"veine","ga":"féith","hr":"vena","hu":"véna","is":"Bláæð","it":"vena","ja":"静脈","lt":"vena","lv":"vēna","nb":"vene","nl":"ader","pl":"żyła","pt":"veia","ro":"venă","ru":"вена","sk":"Žila","sl":"vena","sv":"ven","uk":"вена","ar":"وريد"}),
  defineTranslation("foot", "foot", {"bg":"ходило","cs":"noha","da":"fod","de":"Fuß","es":"pie","et":"labajalg","fi":"jalkaterä","fr":"pied","ga":"cos","hr":"stopalo","hu":"lábfej","is":"fótur","it":"piede","ja":"足","lt":"pėda","lv":"pēda","nb":"fot","nl":"voet","pl":"stopa","pt":"pé","ro":"picior","ru":"стопа","sk":"noha","sl":"stopalo","sv":"fot","uk":"стопа","ar":"قدم"}),
  defineTranslation("hand", "hand", {"bg":"ръка","cs":"ruka","da":"hånd","de":"Hand","el":"χέρι","es":"mano","et":"labakäsi","fi":"käsi","fr":"main","ga":"lámh","hr":"ruka","hu":"kéz","is":"hönd","it":"mano","ja":"手","lt":"ranka","lv":"plauksta","nb":"hånd","nl":"hand","pl":"ręka","pt":"mão","ro":"mână","ru":"кисть","sk":"ruka","sl":"roka","sv":"hand","uk":"кисть","ar":"يد"}),
  defineTranslation("ear", "ear", {"bg":"ухо","cs":"ucho","da":"øre","de":"Ohr","el":"αφτί","es":"oído","et":"kõrv","fi":"korva","fr":"oreille","ga":"cluas","hr":"uho","hu":"fül","is":"eyra","it":"orecchio","ja":"耳","lt":"ausis","lv":"auss","nb":"øre","nl":"oor","pl":"ucho","pt":"orelha","ro":"ureche","ru":"ухо","sk":"ucho","sl":"uho","sv":"öra","uk":"вухо","ar":"أذن"}),
  defineTranslation("nose", "nose", {"bg":"нос","cs":"nos","da":"næse","de":"Nase","el":"μύτη","es":"nariz","et":"nina","fi":"nenä","fr":"nez","ga":"srón","hr":"nos","hu":"orr","is":"nef","it":"naso","ja":"鼻","lt":"nosis","lv":"deguns","nb":"nese","nl":"neus","pl":"nos","pt":"nariz","ro":"nas","ru":"нос","sk":"nos","sl":"nos","sv":"nos","uk":"ніс","ar":"أنف"}),
  defineTranslation("hair", "hair", {"bg":"коса","cs":"chlup","da":"hår","de":"Haar","el":"τρίχα","es":"pelo","et":"karvad","fi":"karva","fr":"poil","ga":"gruaig","hr":"kosa","hu":"haj és szőrzet","is":"hár","it":"pelo","ja":"毛","lt":"plaukas","lv":"mati","nb":"hår","nl":"haar","pl":"włos","pt":"cabelo","ro":"păr","ru":"волосы","sk":"chlp","sl":"las","sv":"hår","uk":"волосся","ar":"شعر"}),
  defineTranslation("neck", "neck", {"bg":"врат","cs":"krk","da":"nakke","de":"Hals","el":"λαιμός","es":"cuello","et":"kael","fi":"kaula","fr":"cou","ga":"muineál","hr":"vrat","hu":"nyak","is":"háls","it":"collo","ja":"首","lt":"kaklas","lv":"Kakls","nb":"hals","nl":"nek","pl":"szyja","pt":"pescoço","ro":"gât","ru":"шея","sk":"krk","sl":"vrat","sv":"hals","uk":"шия","ar":"رقبة"}),
  defineTranslation("abdomen", "abdomen", {"bg":"Корем","cs":"břicho","da":"bughule","de":"Abdomen","el":"κοιλιά","es":"abdomen","et":"Kõht","fi":"vatsa","fr":"abdomen","ga":"abdóman","hr":"trbuh","hu":"has","is":"Afturbolur","it":"addome","ja":"腹","lt":"Pilvelis","lv":"vēders","nb":"abdomen","nl":"buik","pl":"brzuch","pt":"abdómen","ro":"abdomen","ru":"живот","sk":"brucho","sl":"trebuh","sv":"buken","uk":"живіт","ar":"بطن"}),
  defineTranslation("water", "water", {"bg":"вода","cs":"voda","da":"vand","de":"Wasser","el":"νερό","es":"agua","et":"vesi","fi":"vesi","fr":"eau","ga":"uisce","hr":"voda","hu":"víz","is":"vatn","it":"acqua","ja":"水","lt":"vanduo","lv":"ūdens","nb":"vann","nl":"water","pl":"woda","pt":"água","ro":"apă","ru":"вода","sk":"voda","sl":"voda","sv":"vatten","uk":"вода","ar":"ماء"}),
  defineTranslation("star", "star", {"bg":"звезда","cs":"hvězda","da":"stjerne","de":"Stern","el":"αστέρας","es":"estrella","et":"täht","fi":"tähti","fr":"étoile","ga":"réalta","hr":"zvijezda","hu":"csillag","is":"sólstjarna","it":"stella","ja":"恒星","lt":"žvaigždė","lv":"zvaigzne","mt":"stilla","nb":"stjerne","nl":"ster","pl":"gwiazda","pt":"estrela","ro":"stea","ru":"звезда","sk":"hviezda","sl":"zvezda","sv":"stjärna","uk":"зоря","ar":"نجم"}),
  defineTranslation("sea", "sea", {"bg":"море","cs":"moře","da":"hav","de":"Meer","el":"θάλασσα","es":"mar","et":"meri","fi":"meri","fr":"mer","ga":"farraige","hr":"more","hu":"tenger","is":"sjór","it":"mare","ja":"海","lt":"jūra","lv":"jūra","mt":"baħar","nb":"hav","nl":"zee","pl":"morze","pt":"mar","ro":"mare","ru":"море","sk":"more","sl":"morje","sv":"hav","uk":"море","ar":"بحر"}),
  defineTranslation("river", "river", {"bg":"река","cs":"řeka","da":"flod","de":"Fluss","el":"ποταμός","es":"río","et":"jõgi","fi":"joki","fr":"fleuve ou rivière","ga":"abhainn","hr":"rijeka","hu":"folyó","is":"á","it":"fiume","ja":"川","lt":"upė","lv":"upe","nb":"elv","nl":"rivier","pl":"rzeka","pt":"rio","ro":"râu","ru":"река","sk":"rieka","sl":"reka","sv":"flod","uk":"річка","ar":"نهر"}),
  defineTranslation("lake", "lake", {"bg":"езеро","cs":"jezero","da":"sø","de":"See","el":"λίμνη","es":"lago","et":"järv","fi":"järvi","fr":"lac","ga":"loch","hr":"jezero","hu":"tó","is":"stöðuvatn","it":"lago","ja":"湖","lt":"ežeras","lv":"ezers","mt":"lag","nb":"innsjø","nl":"meer","pl":"jezioro","pt":"lago","ro":"lac","ru":"озеро","sk":"jazero","sl":"jezero","sv":"insjö","uk":"озеро","ar":"بحيرة"}),
  defineTranslation("ocean", "ocean", {"bg":"океан","cs":"oceán","da":"verdenshav","de":"Ozean","el":"ωκεανός","es":"océano","et":"ookean","fi":"valtameri","fr":"océan","ga":"aigéan","hr":"ocean","hu":"óceán","is":"haf","it":"oceano","ja":"海洋","lt":"vandenynas","lv":"okeāns","nb":"verdenshav","nl":"oceaan","pl":"ocean","pt":"oceano","ro":"ocean","ru":"океан","sk":"oceán","sl":"ocean","sv":"världshav","uk":"океан","ar":"محيط"}),
  defineTranslation("fire", "fire", {"bg":"Огън","cs":"oheň","da":"ild","de":"Feuer","el":"φωτιά","es":"fuego","et":"Tuli","fi":"tuli","fr":"feu","ga":"tine","hr":"vatra","hu":"tűz","is":"Eldur","it":"fuoco","ja":"火","lt":"ugnis","lv":"uguns","nb":"ild","nl":"vuur","pl":"ogień","pt":"fogo","ro":"foc","ru":"огонь","sk":"oheň","sl":"ogenj","sv":"eld","uk":"вогонь","ar":"نار"}),
  defineTranslation("ice", "ice", {"bg":"лед","cs":"led","da":"is","de":"Eis","el":"πάγος","es":"hielo","et":"jää","fi":"jää","fr":"glace","ga":"oighear","hr":"led","hu":"jég","is":"Ís","it":"ghiaccio","ja":"氷","lt":"ledas","lv":"ledus","nb":"is","nl":"ijs","pl":"lód","pt":"gelo","ro":"gheață","ru":"лёд","sk":"ľad","sl":"led","sv":"is","uk":"лід","ar":"جليد"}),
  defineTranslation("mountain", "mountain", {"bg":"планина","cs":"hora","da":"bjerg","de":"Berg","el":"βουνό","es":"montaña","et":"mägi","fi":"vuori","fr":"montagne","ga":"sliabh","hr":"planina","hu":"hegy","is":"fjall","it":"montagna","ja":"山","lt":"kalnas","lv":"kalns","mt":"muntanja","nb":"fjell","nl":"berg","pl":"góra","pt":"montanha","ro":"munte","ru":"гора","sk":"vrch","sl":"gora","sv":"berg","uk":"гора","ar":"جبل"}),
  defineTranslation("gas", "gas", {"bg":"газ","cs":"plyn","da":"gas","de":"Gas","el":"αέριο","es":"gas","et":"gaas","fi":"kaasu","fr":"gaz","ga":"gás","hr":"plin","hu":"gáz","is":"gas","it":"gas","ja":"気体","lt":"dujos","lv":"gāze","nb":"gass","nl":"gas","pl":"gaz","pt":"gás","ro":"gaz","ru":"газ","sk":"plyn","sl":"plin","sv":"gas","uk":"газ","ar":"غاز"}),
  defineTranslation("animal", "animal", {"bg":"животни","cs":"živočichové","da":"dyr","de":"Tier","el":"ζώο","et":"loomad","fi":"eläinkunta","fr":"animal","ga":"ainmhí","hr":"životinje","hu":"állat","is":"dýr","it":"animale","ja":"動物","lt":"gyvūnai","lv":"dzīvnieki","mt":"annimal","nb":"dyr","nl":"dier","pl":"zwierzęta","pt":"animalia","ro":"Animalia","ru":"животные","sk":"živočíchy","sl":"živali","sv":"djur","uk":"тварина","ar":"حيوانات"}),
]

export default VERIFIED_RENDERINGS

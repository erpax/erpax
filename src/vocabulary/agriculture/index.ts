import{deriveFolderModel}from'@/readme/compute'
export const atomPath='vocabulary/agriculture' as const
export function spreadOf(path:string=atomPath){const m=deriveFolderModel(path);return{debit:m.statement.totalDebits,credit:m.statement.totalCredits}}

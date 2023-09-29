import { IContextType } from 'src/types'
import { idArg, nonNull, extendType, nullable } from 'nexus'

import { InvoiceObjectType } from './types'
import { getInvoices } from './service'
import { PaginatorFilterInputType } from '../common/input-types'
import { NexusGenInputs } from 'nexus-typegen'

export const InvoiceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getInvoices', {
      type: InvoiceObjectType,
      args:{
      },
      async resolve(_, args, ctx) {
        const data = await getInvoices(ctx)
        return data
      },
    })
  },
})

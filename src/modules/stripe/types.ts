import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import { PaginatorObjectType } from '../common/types'

export const CustomerGeneralNode = interfaceType({
  name: 'CustomerGeneral',
  definition(t) {
    t.nonNull.string('message')
    t.nonNull.string('status')
  },
})

export const CustomerObjectType = objectType({
  name: 'CustomerObject',
  definition(t) {
    t.implements(CustomerGeneralNode)
  },
})



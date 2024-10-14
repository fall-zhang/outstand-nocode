import { get, isEmpty } from '@/utils/utils'
const generateIfFilterOptionsData = (activeTab, fields) => {
  const result = {
    options: [
    ],
    operators: {
    }
  }
  fields.forEach((node) => {
    const filterNode = {
      label: node.label,
      value: node.id
    }
    switch (node.type) {
      case 'textarea':
      case 'input':
      case 'html':
        filterNode.renderType = 'TEXT'
        filterNode.operatorKey = 'Text'
        break
      case 'region':
        filterNode.renderType = 'REGION'
        filterNode.operatorKey = 'Region'
        filterNode.selectType = node.options.selectType
        break
      case 'date':
        filterNode.renderType = 'DATE'
        filterNode.operatorKey = 'Number'
        filterNode.includeOperator = {
          dateOperator: ['date']
        }
        filterNode.datePanel = {
          excludeShortcuts: -1,
          excludeManuals: -1
        }
        if (node.options.type === 'datetime') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Number'
        }
        if (node.options.type === 'dates') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Text'
        }
        if (node.options.type === 'daterange') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Text'
          filterNode.excludeOperator = {
            operator: [
              'contains',
              'not_contain'
            ]
          }
        }
        filterNode.datePanel.pickerType = node.options.type || 'date'
        break
      case 'number':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        break
      case 'rate':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        break
      case 'slider':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        filterNode.excludeOperator = {
          operator: [
            'not_empty',
            'empty'
          ]
        }
        break
      case 'radio':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        break
      case 'checkbox':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = true
        break
      case 'select':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = node.options.multiple
        break
      case 'switch':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.excludeOperator = {
          operator: [
            'contains',
            'not_contain',
            'not_empty',
            'empty'
          ]
        }
        break
      case 'cascader':
        filterNode.renderType = 'CASCADER'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = node.options.multiple
        filterNode.customProps = {
          onChange: () => {},
          props: {
            multiple: node.options.multiple,
            emitPath: true,
            checkStrictly: node.options.checkStrictly,
            disabled: 'disabled'
          }
        }
        filterNode.excludeOperator = {
          operator: [
            'contains',
            'not_contain'
          ]
        }
        break
      case 'time':
        filterNode.renderType = 'TIME'
        filterNode.operatorKey = 'Number'
        filterNode.format = 'HH:mm:ss'
        break
      case 'signature':
      case 'uploadfile':
        filterNode.renderType = 'NONE'
        filterNode.operatorKey = 'Text'
        filterNode.includeOperator = {
          operator: [
            'empty',
            'not_empty'
          ]
        }
        break
    }
    if (!result.operators[filterNode.operatorKey]) {
      switch (filterNode.operatorKey) {
        case 'Text':
          result.operators.Text = [
            {
              value: 'equal',
              style: 'noop'
            },
            {
              value: 'not_equal',
              style: 'noop'
            },
            {
              value: 'contains',
              style: 'tags'
            },
            {
              value: 'not_contain',
              style: 'tags'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            return e
          })
          break
        case 'Number':
          result.operators.Number = [
            {
              value: 'equal',
              style: 'noop'
            },
            {
              value: 'not_equal',
              style: 'noop'
            },
            {
              value: 'greater_than',
              style: 'noop'
            },
            {
              value: 'greater_than_equal',
              style: 'noop'
            },
            {
              value: 'less_than',
              style: 'noop'
            },
            {
              value: 'less_than_equal',
              style: 'noop'
            },
            {
              value: 'between',
              style: 'range'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            return e
          })
          break
        case 'Region':
          result.operators.Region = [
            {
              value: 'one_of',
              style: 'tags'
            },
            {
              value: 'not_one_of',
              style: 'tags'
            },
            {
              value: 'belong_one_of',
              style: 'tags'
            },
            {
              value: 'not_belong_one_of',
              style: 'tags'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            return e
          })
          break
      }
    }
    result.options.push(filterNode)
  })
  return result
}
const generateIfFilterConditionsData = (activeTab, state, property) => {
  let result = {}
  const findField = state.fields.find({ id: property })
  if (!isEmpty(findField)) {
    if (findField.type === 'switch') {
      result = [

      ]
    } else {
      result = state.mode === 'edit' ? get(state.data, `${findField.options.dataKey}.list`, []) : get(findField, 'options.data', [])
    }
  }
  return result
}
type ActiveTabType = 'visible'|'required'|'readOnly'|'validation'
const generateThenFilterOptionsData = (activeTab:ActiveTabType) => {
  let result = {}
  switch (activeTab) {
    case 'visible':
      result = {
        options: [
          {

            value: 'show',
            renderType: 'SELECT',
            operatorKey: 'Text'
          },
          {
            value: 'hide',
            renderType: 'SELECT',
            operatorKey: 'Text'
          }
        ],
        operators: {
          Text: [
            {
              value: 'field',
              style: 'tags'
            }
          ]
        }
      }
      break
    case 'required':
      result = {
        options: [
          {
            label: '',
            value: 'required',
            renderType: 'SELECT',
            operatorKey: 'Text',
            multiple: true
          }
        ],
        operators: {
          Text: [
            {
              value: 'required',
              style: 'noop'
            },
            {
              value: 'not_required',
              style: 'noop'
            }
          ]
        }
      }
      break
    case 'readOnly':
      result = {
        options: [
          {
            label: '',
            value: 'readOnly',
            renderType: 'SELECT',
            operatorKey: 'Text',
            multiple: true
          }
        ],
        operators: {
          Text: [

          ]
        }
      }
      break
    case 'validation':
      break
  }
  return result
}
export const generateThenFilterConditionsData = (fields) => {
  return fields.map(e => {
    return {
      label: e.label,
      value: e.id
    }
  })
}
export {
  generateIfFilterOptionsData,
  generateIfFilterConditionsData,
  generateThenFilterOptionsData
}

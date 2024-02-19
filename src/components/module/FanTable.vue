<template>
  <div class="spreadsheet">
    <FanTable style="word-break: break-word" fixed-header :scroll-width="0" :max-height="500" border-y :columns="columns"
      :table-data="tableData" row-key-field-name="rowKey" :virtual-scroll-option="virtualScrollOption"
      :cell-autofill-option="cellAutofillOption" :edit-option="editOption"
      :contextmenu-body-option="contextmenuBodyOption" :contextmenu-header-option="contextmenuHeaderOption"
      :row-style-option="rowStyleOption" :column-width-resize-option="columnWidthResizeOption" />
  </div>
</template>

<script lang="tsx">

const COLUMN_KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
export default {
  name: 'SpreadSheet',
  data() {
    return {
      // start row index
      startRowIndex: 0,
      columnWidthResizeOption: {
        enable: true,
      },
      virtualScrollOption: {
        // 是否开启
        enable: true,
        scrolling: this.scrolling,
      },
      cellAutofillOption: {
        directionX: true,
        directionY: true,
        beforeAutofill: ({
          direction,
          sourceSelectionRangeIndexes,
          targetSelectionRangeIndexes,
          sourceSelectionData,
          targetSelectionData,
        }: any) => { },
        afterAutofill: ({
          direction,
          sourceSelectionRangeIndexes,
          targetSelectionRangeIndexes,
          sourceSelectionData,
          targetSelectionData,
        }: any) => { },
      },
      // edit option 可控单元格编辑
      editOption: {
        beforeCellValueChange: ({ row, column, changeValue }: any) => { },
        afterCellValueChange: ({ row, column, changeValue }: any) => { },
      },
      // contextmenu header
      contextmenuHeaderOption: {
        //  before contextmenu show. 你可以在这里更改 contextmenu 配置
        beforeShow: ({
          isWholeColSelection,
          selectionRangeKeys,
          selectionRangeIndexes,
        }: any) => {
          // do something
        },
        afterMenuClick: ({
          type,
          selectionRangeKeys,
          selectionRangeIndexes,
        }: any) => {
          // do something
        },
        contextmenus: [
          { type: 'CUT', },
          { type: 'COPY', },
          { type: 'SEPARATOR', },
          { type: 'EMPTY_COLUMN', },
          { type: 'SEPARATOR', },
          { type: 'LEFT_FIXED_COLUMN_TO', },
          { type: 'CANCEL_LEFT_FIXED_COLUMN_TO', },
          { type: 'RIGHT_FIXED_COLUMN_TO', },
          { type: 'CANCEL_RIGHT_FIXED_COLUMN_TO', },
        ],
      },
      contextmenuBodyOption: {
        //  before contextmenu show. 你可以在这里更改 contextmenu 配置
        beforeShow: ({
          isWholeRowSelection,
          selectionRangeKeys,
          selectionRangeIndexes,
        }: any) => {
          console.log('---contextmenu body beforeShow--')
          console.log('isWholeRowSelection::', isWholeRowSelection)
          console.log('selectionRangeKeys::', selectionRangeKeys)
          console.log('selectionRangeIndexes::', selectionRangeIndexes)
        },
        afterMenuClick: ({
          type,
          selectionRangeKeys,
          selectionRangeIndexes,
        }: any) => {
          console.log('---contextmenu body afterMenuClick--')
          console.log('type::', type)
          console.log('selectionRangeKeys::', selectionRangeKeys)
          console.log('selectionRangeIndexes::', selectionRangeIndexes)
        },
        contextmenus: [
          { type: 'CUT', },
          { type: 'COPY', },
          { type: 'SEPARATOR', },
          { type: 'INSERT_ROW_ABOVE', },
          { type: 'INSERT_ROW_BELOW', },
          { type: 'SEPARATOR', },
          { type: 'REMOVE_ROW', },
          { type: 'EMPTY_ROW', },
          { type: 'EMPTY_CELL', },
        ],
      },
      rowStyleOption: {
        clickHighlight: false,
        hoverHighlight: false,
      },
      tableData: [],
    }
  },
  computed: {
    // current local
    columns() {
      let columns = [
        {
          field: 'index',
          key: 'index',
          // is operation column
          operationColumn: true,
          title: '',
          width: 55,
          fixed: 'left',
          renderBodyCell: this.renderRowIndex,
        },
      ]
      const newList = COLUMN_KEYS.map((keyValue) => {
        return {
          title: keyValue,
          field: keyValue,
          key: keyValue,
          width: 90,
          edit: true,
        }
      })
      columns = columns.concat(newList)
      return columns
    },
  },
  created() {
    this.initTableData()
  },
  methods: {
    // 渲染 row index
    renderRowIndex({ row, column, rowIndex }: any) {
      return (<span>{rowIndex + this.startRowIndex + 1}</span>)
    },
    scrolling({
      startRowIndex,
      visibleStartIndex,
      visibleEndIndex,
      visibleAboveCount,
      visibleBelowCount,
    }: any) {
      this.startRowIndex = startRowIndex
    },
    initTableData() {
      const tableData = []
      for (let i = 0; i < 5000; i++) {
        const dataItem = {
          rowKey: i,
        }
        COLUMN_KEYS.forEach((keyValue) => {
          dataItem[keyValue] = ''
        })
        if (i === 1 || i === 3) {
          dataItem.C = 'YOU'
          dataItem.D = 'CAN'
          dataItem.E = 'TRY'
          dataItem.F = 'ENTER'
          dataItem.G = 'SOME'
          dataItem.H = 'WORDS'
          dataItem.I = '!!!'
        }
        tableData.push(dataItem)
      }
      this.tableData = tableData
    },
  },
}
</script>
<style lang="scss">
.spreadsheet {
  height: 800px;
  width: 600px;
  padding: 0 100px;
  margin: 30px 0;
}
</style>
<template>
  <el-table
  :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
  class="table-container"
  max-height="420"
  row-key="batchId"
  >
    <el-table-column prop="sequenceId" label="流水号" width="120" />
    <el-table-column prop="batchId" label="批次Id" width="120" />
    <el-table-column
      property="desc"
      label="描述"
      show-overflow-tooltip
    />
    <el-table-column prop="bank" label="银行号" width="80" />
    <el-table-column label="状态" width="120">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>status: {{ scope.row.status }}</div>
            <div>statusdesc: {{ scope.row.statusdesc }}</div>
          </template>
          <template #reference>
            <el-tag
            :type="getTypeByStatus(scope.row.status)"
            >{{ statusMap[scope.row.status as keyof typeof statusMap] }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="日期" min-width="140">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240">
      <template #default="scope">
        <el-button 
        type="warning" 
        size="small" 
        @click="handleDetail(scope.$index, scope.row)">
          详情
        </el-button>
        <el-button 
        type="primary" 
        size="small" 
        @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
    <!-- 使用 empty 插槽自定义空状态 -->
    <template #empty>
      <el-empty :image-size="200" description="暂无数据">
      </el-empty>
    </template>
  </el-table>
  <div class="pagination-container">
    <span>第{{ currentPage }}页（共{{ totalPages }}页，{{ totalRecords }}条记录）</span>
    <el-pagination
      background
      layout="prev, pager, next"
      size="small"
      :total="totalRecords"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

interface TableData {
  sequenceId: string
  batchId: string
  desc: string
  bank: string
  date: string
  status: string
  address: string
  statusdesc: string
  hasChildren?: boolean
  children?: TableData[]
}

const statusMap: { [key: string]: string } = {
  '1': '执行中',
  '2': '已中断',
  '3': '已结束',
}

const getTypeByStatus = (status: string) => {
  switch (status) {
    case '1':
      return 'primary'
    case '2':
      return 'danger'
    case '3':
      return 'success'
    default:
      return 'info'
  }
}

const handleDetail = (index: number, row: TableData) => {
  console.log(index, row)
}
const handleEdit = (index: number, row: TableData) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: TableData) => {
  console.log(index, row)
}

const tableData: TableData[] = [
  {
    sequenceId: '111',
    date: '2016-05-03',
    batchId: 'Batch1',
    desc: '某银行批量维护某卡客户地址',
    address: 'No. 189, Grove St, Los Angeles',
    status: '3',
    bank: '302',
    statusdesc: '已结束：批次正常结束',
  },
  {
    sequenceId: '222',
    date: '2016-05-02',
    batchId: 'Batch2',
    desc: '某银行批量维护某卡客户地址',
    address: 'No. 189, Grove St, Los Angeles',
    status: '1',
    bank: '302',
    statusdesc: '执行中：批次正常执行',
    children: [  
      {
        sequenceId: '2221',
        date: '2016-05-02',
        batchId: 'Batch2-1',
        desc: '某银行批量维护某卡客户地址',
        address: 'No. 189, Grove St, Los Angeles',
        status: '1',
        bank: '302',
        statusdesc: '执行中：批次正常执行',
      },
      {
        sequenceId: '2222',
        date: '2016-05-02',
        batchId: 'Batch2-2',
        desc: '某银行批量维护某卡客户地址',
        address: 'No. 189, Grove St, Los Angeles',
        status: '1',
        bank: '302',
        statusdesc: '执行中：批次正常执行',
      }
    ]
  },
  {
    sequenceId: '333',
    date: '2016-05-04',
    batchId: 'Batch3',
    desc: '某银行批量维护某卡客户地址',
    address: 'No. 189, Grove St, Los Angeles',
    status: '2',
    bank: '302',
    statusdesc: '中断：任务业务上引起的中断',
  },
  {
    sequenceId: '444',
    date: '2016-05-01',
    batchId: 'Batch4',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '1',
    bank: '302',
    statusdesc: '执行中：批次正常执行',
  },
  {
    sequenceId: '555',
    date: '2016-05-08',
    batchId: 'Batch5',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '2',
    bank: '302',
    statusdesc: '中断：任务业务上引起的中断',
  },
  {
    sequenceId: '666',
    date: '2016-05-06',
    batchId: 'Batch6',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '1',
    bank: '302',
    statusdesc: '执行中：批次正常执行',
  },
  {
    sequenceId: '777',
    date: '2016-05-07',
    batchId: 'Batch7',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '2',
    bank: '302',
    statusdesc: '中断：任务业务上引起的中断',
  },
  {
    sequenceId: '888',
    date: '2016-05-09',
    batchId: 'Batch8',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '3',
    bank: '302',
    statusdesc: '已结束：批次正常结束',
  },
  {
    sequenceId: '999',
    date: '2016-05-10',
    batchId: 'Batch9',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '3',
    bank: '302',
    statusdesc: '已结束：批次正常结束',
  },
  {
    sequenceId: '1010',
    date: '2016-05-10',
    batchId: 'Batch10',
    desc: '某银行申请录入外挂',
    address: 'No. 189, Grove St, Los Angeles',
    status: '3',
    bank: '302',
    statusdesc: '已结束：批次正常结束',
  }
]

const pageSize = ref(9);
const currentPage = ref(1);
const totalRecords = ref(tableData.length);
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value));

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};
</script>

<style lang="scss">
.el-form-item__label {
  font-weight: 600;
  color: #303133 !important;
}
.table-container {
  width: 100%;
  margin-top: 20px;
  min-height: 300px;
  thead {
    color: #303133 !important;
  }
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 5px 12px;
  font-size: 14px;
}
</style>
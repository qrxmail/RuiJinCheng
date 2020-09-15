import React, { useState, useRef } from "react";
import { PlusOutlined, ExclamationCircleOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Divider, Modal, message, Upload } from "antd";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import UpdateForm from './components/UpdateForm';
import { query, update, add, remove } from './service';
import '../../Common.less';

// 确认对话框
const { confirm } = Modal;

// 新增/修改
const handleUpdate = async (fields) => {
  const hide = message.loading('正在保存');

  // 将null和空字符串的属性去掉
  Object.keys(fields).forEach((key) => {
    //let tkey = key as keyof typeof fields;
    if (fields[key] == null || fields[key] == '') {
      delete fields[key];
    }
  });

  try {
    if (fields.isAdd) {
      await add(fields);
    } else {
      await update(fields);
    }

    hide();

    message.success('保存成功');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败请重试！');
    return false;
  }
};

// 删除节点
const handleRemove = async (selectedRows) => {

  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {

    selectedRows.forEach(async (dto) => {
      await PressureVesselDeviceService.delete(dto);
    })

    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }

};

export default () => {

  // 列表的列属性
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
      //fixed: "left",
      //width: 80,
    },
    {
      title: "管理编号",
      dataIndex: "internalSerialNumber",
      //fixed: "left",
      //width: 150,
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      }
    },
    {
      title: "所属分公司",
      dataIndex: "branch",
    },
    {
      title: "所在区域",
      dataIndex: "area",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "使用地点",
      dataIndex: "location",
    },
    {
      title: "所属设备",
      dataIndex: "mainDeviceId",
    },
    {
      title: "压力容器名称",
      dataIndex: "name",
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      }
    },
    {
      title: "安装部位",
      dataIndex: "installPosotion",
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "容积",
      dataIndex: "volume",
    },
    {
      title: "设计压力",
      dataIndex: "designPressure",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "实际工作压力",
      dataIndex: "actualPressureStr",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "压力容器类别",
      dataIndex: "deviceType",
    },
    {
      title: "生产厂家",
      dataIndex: "supplier",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "出厂编号",
      dataIndex: "productionSerialNumber",
    },
    {
      title: "安装单位",
      dataIndex: "installByCompany",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "数量",
      dataIndex: "",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "单位",
      dataIndex: "",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "使用登记证编号",
      dataIndex: "useRegistNo",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "安全等级",
      dataIndex: "safetyLevel",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "发证单位",
      dataIndex: "licenseCompany",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "出厂时间",
      dataIndex: "productionDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "进场时间",
      dataIndex: "arrivalDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "安装告知时间",
      dataIndex: "installInformDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "安装调试结束时间",
      dataIndex: "commissionDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "中间验交时间",
      dataIndex: "interAcceptenceDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "监督检验时间",
      dataIndex: "supervisionInspectionDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "试运行时间",
      dataIndex: "testRunDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "竣工验收",
      dataIndex: "completedDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "投用时间",
      dataIndex: "onlineDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "注册登记时间",
      dataIndex: "resgisterDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "最近一次全面检验时间",
      dataIndex: "lastInspectionDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "下次检验时间",
      dataIndex: "nextInspectionDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "停用时间",
      dataIndex: "offLineDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "注销时间",
      dataIndex: "cancellatinoResgisterDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "报废时间",
      dataIndex: "retireDate",
      valueType: "date",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否超期",
      dataIndex: "isExprire",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "设备状态",
      dataIndex: "state",
    },
    {
      title: "资料情况",
      dataIndex: "documentState",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "手续办理情况",
      dataIndex: "procedureStatus",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否属于关键装置、重点部位",
      dataIndex: "isKeyPart",
    },
    {
      title: "责任人",
      dataIndex: "resonsibleStaff",
    },
    {
      title: "其他情况",
      dataIndex: "",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(entity);
              setModelTitle("修改");
            }}>
            修改
          </a>

          <Divider type="vertical" />

          <a
            onClick={() => {
              // 删除确认
              confirm({
                title: '您确定要删除这条记录吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk() {
                  var delRows = [];
                  delRows.push(entity);
                  handleRemove(delRows);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
                onCancel() {
                },
              });

            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  // 详情页面传入的参数（选择的行数据）
  const [row, setRow] = useState();

  // 多选按钮选中的行数据
  const [selectedRowsState, setSelectedRows] = useState([]);

  // 新增、修改页面是否可见
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // 新增、修改表单初始值
  const [formValues, setFormValues] = useState({});
  // 新增、修改页面的标题
  const [modelTitle, setModelTitle] = useState("");

  const actionRef = useRef();

  // 文件上传组件属性
  const uploadProps = {
    name: 'file',
    action: 'https://localhost:44332/api/app/pressureVesselDevice/uploadFiles',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 导入成功`);
        // 刷新列表
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败.`);
      }
    },
  };

  // 绘制列表页面
  return (
    <PageContainer>

      {/* 列表 */}
      <ProTable
        actionRef={actionRef}
        size="small"
        rowKey="id"
        dateFormatter="string"
        headerTitle="查询结果"
        // 设置查询表单的size
        form={{
          size: 'small',
        }}
        columns={columns}
        // 查询，列表数据请求
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        // request={async (params, sort, filter) => {
        //   let result = await PressureVesselDeviceService.getAll({
        //     ...params,
        //     sort,
        //     filter,
        //   });
        //   return result;
        // }}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        toolBarRender={() => [

          <Button key="export" type="primary" size='small'
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues({ isAdd: true });
              console.log("formValues:" + JSON.stringify(formValues));
              setModelTitle("新增");
            }}>
            <PlusOutlined />
            新增
          </Button>,

          <Upload {...uploadProps}>
            <Button key="import" type="primary" size='small'>
              <DownloadOutlined /> 导入
            </Button>
          </Upload>,
          <Button key="export" type="primary" size='small' onClick={() => { window.location.href = "/text.xlsx" }}>
            <UploadOutlined />导出
          </Button>,

          // 选中的行大于0，显示批量删除按钮
          //   selectedRowsState?.length > 0 ?
          //     <Button key="batchdel" type="primary" size='small'
          //       onClick={async () => {
          //         await handleRemove(selectedRowsState);
          //         setSelectedRows([]);
          //         actionRef.current?.reloadAndRest?.();
          //       }}
          //     >
          //       批量删除
          //  </Button> : null
        ]}
      //scroll={{ x: 4000 }}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button key="batchdel" type="primary" size='small'
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
         </Button>
        </FooterToolbar>
      )}

      {/* 详情 */}
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>

      {/* 新增/修改:需要先设置初始值，再展示页面，否则初始值设置不生效 */}
      {formValues && Object.keys(formValues).length && updateModalVisible ? (
        <UpdateForm
          title={modelTitle}
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={formValues}
        />
      ) : null}

    </PageContainer>
  );
};


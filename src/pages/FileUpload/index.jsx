import React, { useState, useEffect } from "react";
import { Button, Upload } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { query } from './service';
import { fileUploadPreUrl, fileDownLoadPreUrl } from '../dic.config';

export default (props) => {
  // 表名
  const tableName = props.tableName;
  // 对应数据的主键ID
  const dataId = props.dataId;

  // 获取文件列表数据
  let initList = [];
  const [fileList, SetFileList] = useState(initList);
  useEffect(() => {
    query({ tableName, dataId, current: 1, pageSize: 1000 }).then((result) => {
      let datas = result.data;
      // 给上传控件属性赋值
      datas = datas.map(data => {
        data.url = fileDownLoadPreUrl + data.storeName;
        data.name = data.fileName;
        data.status = "done";
        data.uid = data.id;
        return data;
      });
      SetFileList(datas);
    });

  }, [tableName]);

  // 文件上传组件属性
  const uploadProps = {
    name: 'file',
    //action: 'https://localhost:44332/api/app/file/uploadFiles',
    action: `${fileUploadPreUrl}api/app/file/uploadFiles`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: true,
    multiple: true,
    fileList: fileList,
    onChange(info) {
      let fileList = [...info.fileList];
      // 获取文件的访问地址
      fileList = fileList.map(file => {
        // 后端接口调用成功后，file.response就接收了返回结果
        if (file.response) {
          file.url = fileDownLoadPreUrl + file.response[0].storeName;
          file.fileName = file.response[0].fileName;
          file.storeName = file.response[0].storeName;
          file.path = file.response[0].path;
        }
        return file;
      });
      SetFileList(fileList);
      // 通过调用props的onSubmitFileList方法，将文件列表传递给修改页面
      props.onSubmitFileList(fileList);
    },
  };

  // 绘制列表页面
  return (
    <div>
      <Upload {...uploadProps}>
        <Button key="upload" type="primary" size='small' style={{ display: props.display }}>
          <DownloadOutlined /> 上传附件
        </Button>
      </Upload>
    </div>
  );
};


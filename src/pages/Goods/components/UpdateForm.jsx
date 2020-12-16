import React, { useState } from 'react';
import { Form, Input, InputNumber, Drawer, Button, Select, Divider, Row, Col } from 'antd';

import { factoryDic } from '../../dic.config';
import { drawWidth } from '../../common';
import File from "../../FileUpload/index";

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;

// 组件定义
const UpdateForm = (props) => {
    // 文件列表数据
    let initList = [];
    const [fileList, SetFileList] = useState(initList);

    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.pk == undefined ? true : false,
        pk: props.values.pk == undefined ? '' : props.values.pk,
        supplierName: props.values.supplierName,
        name: props.values.name,
        params: props.values.params,
        picture: props.values.picture,
        type: props.values.type,
        brand: props.values.brand,
        price: props.values.price,
        stock: props.values.stock,
        priceJd: props.values.priceJd,
        hrefJd: props.values.hrefJd,
        state: props.values.state,
        remark: props.values.remark,
    });

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 组件属性定义：要想使用组件，就要为组件属性传值，实现值和方法的传递
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        title,
    } = props;

    // 提交事件
    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();

        setLoading(true);

        setFormVals({ ...formVals, ...fieldsValue });
        await handleUpdate({ ...formVals, ...fieldsValue }, fileList);

        setLoading(false);
    };

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="supplierName"
                            label="供应商"
                        //rules={[{ required: true, message: '请选择！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {factoryDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="name"
                            label="名称"
                            rules={[{ required: true, message: '请输入名称！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="params"
                            label="参数"
                            rules={[{ required: true, message: '请输入参数！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="type"
                            label="分类"
                            rules={[{ required: true, message: '请输入分类！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {factoryDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="brand"
                            label="品牌"
                            rules={[{ required: true, message: '请输入分类！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {factoryDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="price"
                            label="价格"
                            rules={[{ required: true, message: '请输入价格！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="stock"
                            label="库存"
                            rules={[{ required: true, message: '请输入库存！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="priceJd"
                            label="京东价格"
                            rules={[{ required: true, message: '请输入京东价格！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="hrefJd"
                            label="京东链接"
                            rules={[{ required: true, message: '请输入京东链接！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="taxRate"
                            label="税率"
                            rules={[{ required: true, message: '请输入税率！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="taxPrice"
                            label="税费"
                            rules={[{ required: true, message: '请输入税费！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="remark"
                            label="备注"
                        >
                            <TextArea rows={4} placeholder="请输入备注" />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                        图片
                    </Divider>
                    <File tableName={'ReportAbnormal'} dataId={formVals.pk} onSubmitFileList={(value) => { SetFileList(value) }} />
                </Row>
            </>
        );
    };

    return (
        <Drawer
            width={drawWidth(600)}
            bodyStyle={{ padding: 0 }}
            destroyOnClose
            title={title}
            visible={updateModalVisible}
            onClose={() => handleUpdateModalVisible()}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        提交
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleUpdateModalVisible()}>
                        取消
                    </Button>
                </div>
            }
        >
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                form={form}
                size='small'
                initialValues={{
                    pk: formVals.pk,
                    supplierName: formVals.supplierName,
                    name: formVals.name,
                    params: formVals.params,
                    picture: formVals.picture,
                    type: formVals.type,
                    brand: formVals.brand,
                    price: formVals.price,
                    stock: formVals.stock,
                    priceJd: formVals.priceJd,
                    hrefJd: formVals.hrefJd,
                    state: formVals.state,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>

    );
};

export default UpdateForm;

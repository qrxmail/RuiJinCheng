import React, { useState } from 'react';
import { Form, Input, InputNumber, Drawer, Button, Select, Divider, Row, Col } from 'antd';

import { factoryDic } from '../../dic.config';
import { drawWidth } from '../../common';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.pk == undefined ? true : false,
        pk: props.values.pk == undefined ? '' : props.values.pk,
        name: props.values.name,
        registeredCapital: props.values.registeredCapital,
        registeredAddress: props.values.registeredAddress,
        productAddress: props.values.productAddress,
        responseUser: props.values.responseUser,
        phone: props.values.phone,
        email: props.values.email,
        mainBusiness: props.values.mainBusiness,
        accountName: props.values.accountName,
        accountNo: props.values.accountNo,
        bank: props.values.bank,
        bankBranch: props.values.bankBranch,
        accountType: props.values.accountType,
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
        await handleUpdate({ ...formVals, ...fieldsValue });

        setLoading(false);
    };

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
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
                            name="registeredCapital"
                            label="注册资金"
                            rules={[{ required: true, message: '请输入注册资金！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="registeredAddress"
                            label="注册地址"
                            rules={[{ required: true, message: '请输入注册地址！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="productAddress"
                            label="生产地址"
                            rules={[{ required: true, message: '请输入生产地址！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="responseUser"
                            label="负责人"
                            rules={[{ required: true, message: '请输入负责人！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="accountName"
                            label="户名"
                            //rules={[{ required: true, message: '请输入户名！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="accountNo"
                            label="账户"
                            //rules={[{ required: true, message: '请输入账户！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="bank"
                            label="银行"
                            //rules={[{ required: true, message: '请输入银行！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="bankBranch"
                            label="银行支行"
                            //rules={[{ required: true, message: '请输入银行支行！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="accountType"
                            label="账户类型"
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
                            name="remark"
                            label="备注"
                        >
                            <TextArea rows={4} placeholder="请输入备注" />
                        </FormItem>
                    </Col>
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
                    name: formVals.name,
                    registeredCapital: formVals.registeredCapital,
                    registeredAddress: formVals.registeredAddress,
                    productAddress: formVals.productAddress,
                    responseUser: formVals.responseUser,
                    phone: formVals.phone,
                    email: formVals.email,
                    mainBusiness: formVals.mainBusiness,
                    accountName: formVals.accountName,
                    accountNo: formVals.accountNo,
                    bank: formVals.bank,
                    bankBranch: formVals.bankBranch,
                    accountType: formVals.accountType,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>

    );
};

export default UpdateForm;

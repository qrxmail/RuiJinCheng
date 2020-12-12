import React, { useState } from 'react';
import { Form, Input, Drawer, Button, Row, Col } from 'antd';
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
        accountInvoice: props.values.accountInvoice,
        accountPay: props.values.accountPay,
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
                            label="公司名称"
                            rules={[{ required: true, message: '请输入运输单位！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="accountInvoice"
                            label="开票账户"
                            //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="accountPay"
                            label="支出账户"
                            //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <Input placeholder="请输入" />
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
                    accountInvoice: formVals.accountInvoice,
                    accountPay: formVals.accountPay,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;

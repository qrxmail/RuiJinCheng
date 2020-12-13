import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Button, Cascader, InputNumber, DatePicker, Select, Row, Col, AutoComplete, Tabs } from 'antd';
import moment from 'moment';
import { drawWidth, setTime } from '../../common';
import { factoryDic } from '../../dic.config';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.pk == undefined ? true : false,
        pk: props.values.pk == undefined ? '' : props.values.pk,
        serialNumber: props.values.serialNumber,
        loadStationBranch: props.values.loadStationBranch,
        loadStationName: props.values.loadStationName,
        loadStation: props.values.loadStation,
        loadingBeginTime: props.values.loadingBeginTime,
        loadingEndTime: props.values.loadingEndTime,
        unloadStationBranch: props.values.unloadStationBranch,
        unloadStationName: props.values.unloadStationName,
        unloadStation: props.values.unloadStation,
        oilLoadedMax: props.values.oilLoadedMax,
        carNumber: props.values.carNumber,
        driver: props.values.driver,
        status: props.values.status,
        remark: props.values.remark,
    });

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 组件属性定义：要想使用组件，就要为组件属性传值，实现值和方法的传递
    const {
        onSubmit: handleUpdate,
        onCancel: handleModalVisible,
        modalVisible,
        title,
        dispatch,
        oilStationData,
        truckData,
        driverData,
    } = props;

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'common/fetchOilStationData',
            });
            dispatch({
                type: 'common/fetchTruckData',
            });
            dispatch({
                type: 'common/fetchDriverData',
            });
        }
    }, []);

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
                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab={<span>销售单</span>} key="1">
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="serialNumber"
                                    label="订单编号"
                                    rules={[{ required: true, message: '请输入订单编号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="saler"
                                    label="销售人"
                                    rules={[{ required: true, message: '请选择销售人！' }]}
                                >
                                    <Cascader
                                        options={oilStationData}
                                        expandTrigger="hover"
                                        placeholder="请选择"
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="saleDate"
                                    label="开单日期"
                                    rules={[{ required: true, message: '请选择开单日期！' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} format="YYYY年MM月DD日" placeholder="选择日期" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="customerName"
                                    label="客户名称"
                                    rules={[{ required: true, message: '请选择客户！' }]}
                                >
                                    <Cascader
                                        options={oilStationData}
                                        expandTrigger="hover"
                                        placeholder="请选择"
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="deliveryDate"
                                    label="交货日期"
                                    rules={[{ required: true, message: '请选择交货日期！' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} format="YYYY年MM月DD日" placeholder="选择日期" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="goodsName"
                                    label="商品名称"
                                    rules={[{ required: true, message: '请输入商品名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="spec"
                                    label="规格型号"
                                    rules={[{ required: true, message: '请输入规格型号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceSale"
                                    label="销售单价"
                                    rules={[{ required: true, message: '请输入销售单价！' }]}
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceSale"
                                    label="销售总价"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="picture"
                                    label="图片"
                                // rules={[{ required: true, message: '请输入订单编号！' }]}
                                >
                                    <Input placeholder="请上传图片" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="files"
                                    label="附件"
                                // rules={[{ required: true, message: '请输入订单编号！' }]}
                                >
                                    <Input placeholder="请上传附件" />
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
                    </TabPane>
                    <TabPane tab={<span>采购单</span>} key="2">
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="buyer"
                                    label="采购人"
                                    rules={[{ required: true, message: '请选择采购人！' }]}
                                >
                                    <Cascader
                                        options={oilStationData}
                                        expandTrigger="hover"
                                        placeholder="请选择"
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="buyDate"
                                    label="采购日期"
                                    rules={[{ required: true, message: '请选择采购日期！' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} format="YYYY年MM月DD日" placeholder="选择日期" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="supplier"
                                    label="供应商"
                                //rules={[{ required: true, message: '请选择！' }]}
                                >
                                    <AutoComplete placeholder="请输入或选择" filterOption options={truckData.map((item) => ({ value: item.text }))} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="goodsName"
                                    label="商品名称"
                                    rules={[{ required: true, message: '请输入商品名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="spec"
                                    label="规格型号"
                                    rules={[{ required: true, message: '请输入规格型号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceSale"
                                    label="采购单价"
                                    rules={[{ required: true, message: '请输入销售单价！' }]}
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceSale"
                                    label="采购总价"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceTax"
                                    label="税费"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceTransport"
                                    label="运费"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name=""
                                    label="总利润"
                                >

                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name=""
                                    label="利润率"
                                >

                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="picture"
                                    label="图片"
                                // rules={[{ required: true, message: '请输入订单编号！' }]}
                                >
                                    <Input placeholder="请上传图片" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="files"
                                    label="附件"
                                // rules={[{ required: true, message: '请输入订单编号！' }]}
                                >
                                    <Input placeholder="请上传附件" />
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
                    </TabPane>
                    <TabPane tab={<span>物流</span>} key="3">
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="companyExpress"
                                    label="快递公司"
                                    rules={[{ required: true, message: '请选择快递公司！' }]}
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
                                    name="companyExpress"
                                    label="快递单号"
                                    rules={[{ required: true, message: '请输入快递单号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                    <Button key="query" size='small' type="primary">查询</Button>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name=""
                                    label="快递信息"
                                >
                                    <TextArea rows={4} placeholder="" />
                                </FormItem>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span>开票</span>} key="4">
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="name"
                                    label="申请人"
                                    rules={[{ required: true, message: '请选择申请人！' }]}
                                >
                                    <Cascader
                                        options={oilStationData}
                                        expandTrigger="hover"
                                        placeholder="请选择"
                                    />
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
                                    name="accountType"
                                    label="发票类型"
                                    rules={[{ required: true, message: '请选择客户！' }]}
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
                                    label="客户名称"
                                    rules={[{ required: true, message: '请选择客户！' }]}
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
                                    name="taxNo"
                                    label="税号"
                                    rules={[{ required: true, message: '请输入车牌号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="registeredAddress"
                                    label="注册地址"
                                    rules={[{ required: true, message: '请输入车牌号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="phone"
                                    label="电话"
                                    rules={[{ required: true, message: '请输入车牌号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="accountBank"
                                    label="开户行"
                                    rules={[{ required: true, message: '请输入车牌号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="BankNo"
                                    label="银行账号"
                                    rules={[{ required: true, message: '请输入车牌号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="goodsName"
                                    label="商品名称"
                                    rules={[{ required: true, message: '请输入商品名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="spec"
                                    label="规格型号"
                                    rules={[{ required: true, message: '请输入规格型号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="unit"
                                    label="单位"
                                    rules={[{ required: true, message: '请输入单位！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceInvoice"
                                    label="开票单价"
                                    rules={[{ required: true, message: '请输入销售单价！' }]}
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="priceInvoice"
                                    label="总价"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="rateTax"
                                    label="税率"
                                >
                                    <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>

                        </Row>
                    </TabPane>
                </Tabs>

            </>
        );
    };

    return (
        <Drawer
            width={drawWidth(600)}
            bodyStyle={{ padding: 0 }}
            destroyOnClose
            title={title}
            visible={modalVisible}
            onClose={() => handleModalVisible()}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        提交
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleModalVisible()}>
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
                    serialNumber: formVals.serialNumber !== undefined ? formVals.serialNumber : moment().format('YYYYMMDDHHmmss'),
                    loadStationName: formVals.loadStation !== undefined ? [formVals.loadStationBranch, formVals.loadStationName, formVals.loadStation] : null,
                    loadtimeRange: (setTime(formVals.loadingBeginTime) !== null && setTime(formVals.loadingEndTime) !== null) ?
                        [setTime(formVals.loadingBeginTime), setTime(formVals.loadingEndTime)] : null,
                    unloadStationName: formVals.unloadStation !== undefined ? [formVals.unloadStationBranch, formVals.unloadStationName, formVals.unloadStation] : null,
                    oilLoadedMax: formVals.oilLoadedMax,
                    carNumber: formVals.carNumber,
                    driver: formVals.driver,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default connect(({ common }) => ({
    oilStationData: common.oilStationData,
    driverData: common.driverData,
    truckData: common.truckData,
}))(UpdateForm);

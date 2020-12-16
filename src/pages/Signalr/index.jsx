import React, { useState, useEffect } from "react";
import * as signalR from '@microsoft/signalr';
import { notification, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

export default () => {
    
    //const [msgState, setMsgState] = useState([]);
    const msgArr = [];
    // 建立连接
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    // 接受消息
    connection.on("ReceiveMessage", function (user, message) {

        notification.info({
            message: 'user：',
            description: message,
            placement: 'bottomRight',
            duration: null,
            icon: <ExclamationCircleFilled />
        })

        msgArr.push(user + message);
        //setMsgState(msgArr);
        console.log(user + message);
    });

    // 开始监听
    connection.start().then(function () {
        console.log("start");
        msgArr.push("start");
        //setMsgState(msgArr);
    }).catch(function (err) {
        msgArr.push(err.toString());
        //setMsgState(msgArr);
        return console.error(err.toString());
    });

    // 绘制
    return (
        <div>
            {msgState.join("<br/>")}
        </div>
    );
};


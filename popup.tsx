import React, { useEffect, useState } from "react"
import Button from "antd/es/button"
import Table from "antd/es/table"
import Space from "antd/es/space"
import Input from "antd/es/input"
import notification from "antd/es/notification"
import message from "antd/es/message"
import { ThemeProvider } from "~theme"
import axios, { AxiosResponse } from 'axios';
import { Storage } from "@plasmohq/storage"

function postData(url, data) {
  return axios.post(url, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    throw new Error('请求失败:', error);
  });
}

const get_config_url = 'https://kalodata.com/au/getAutomations';

const columns: TableColumnsType<DataType> = [
  {
    title: '用户国家',
    dataIndex: 'country',
    key: 'country',
    width: '90px'
  },
  {
    title: '会员等级',
    dataIndex: 'tag',
    key: 'tag',
    width: '80px'
  },
  {
    title: '套餐',
    dataIndex: 'package',
    key: 'package',
    width: '70px'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    width: '140px'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: '60px',
    render: () => <a>登录</a>,
  },
];
const storage = new Storage({
  area: "local"
})

// 设置数据到本地存储
function setPassport(value) {
  const key = 'passport'
  storage.set(key, value);
}

// 获取本地存储中的数据
function getPassport() {
  const key = 'passport'
  return storage.get(key)
}

function IndexPopup() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const [dataSource, setDataSource] = useState([]);
  getPassport().then(passport => {
    if (passport && dataSource.length === 0) {
      postData(get_config_url, {passport})
      .then(data => {
        if (data.success) {
          setDataSource(data.data)
          setInputValue(passport)
        } else {
          message.error(data.message)
        }
      })
      .catch(error => {
        // 请求失败时，处理错误信息
        message.error('请求测试账号失败， 请检查网络');
      });
    }
  })

  const [api, contextHolder] = notification.useNotification();

  return (
    <ThemeProvider>
      <div
        style={{
          minWidth: "500px",
          display: "flex",
          flexDirection: "column",
          padding: 8
        }}>
        <Space direction="vertical" size="middle">
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="Please Input The Test Code" value={inputValue} onChange={handleChange} />
            <Button 
              type="primary"
              onClick={ (event) => {
                  postData(get_config_url, {passport:inputValue})
                  .then(data => {
                    if (data.success) {
                      setDataSource(data.data)
                      setPassport(inputValue)
                      message.info("账号获取成功")
                    } else {
                      message.error(data.message)
                    }
                  })
                  .catch(error => {
                    // 请求失败时，处理错误信息
                    message.error('请求测试账号失败， 请检查网络');
                  });
                }
              }
            >获取账号</Button>
          </Space.Compact>
        </Space>
        <Table 
          bordered="true"
          dataSource={dataSource} 
          rowKey='phone'
          columns={columns} 
          style={{ marginTop: "8px", hidden: dataSource.length == 0 }} 
          pagination={{ pageSize: 50 }} 
          scroll={{ y: 350 }}
          size="small"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log("Test Login " + record)
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                  const tab = tabs[0];
                  if (tab.id) {
                    chrome.tabs.sendMessage(
                      tab.id,
                      {
                        record: record,
                        passport: inputValue
                      },
                      (msg) => {
                        console.log(msg)
                        message.info(msg, 3)
                      }
                    );
                  }
                });
              }, 
            };
          }}
          />
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup

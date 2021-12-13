import React, { Component, useState, useEffect  } from "react";
import axios from "axios";
import {  Button, Spin,   Table, PageHeader  } from 'antd';


export default function Home() {
  const [loadTeachers, setLoadTeacher] = useState(null);
  const getTeachers = () =>{
    axios.get("http://localhost:8000/api/v1/teachers").then((r) => {
      setLoadTeacher(r.data.data); 
    });
  }

  const column = [
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Имэйл',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Утас',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  useEffect(() => {
      if (loadTeachers === null) {
        getTeachers();
      }
    }, [loadTeachers]);


  
    return  loadTeachers ? 
    (<div  className="container mt-3 mb-3">
      <PageHeader title="Багш нар"  />
      <Table dataSource={loadTeachers} columns={column} />
    </div>)
  
  : (<div className="container text-center"><Spin /></div>);
  }
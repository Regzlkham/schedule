import React, { Component, useState, useEffect  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import {  Button, Spin,  Select } from 'antd';


export default function Home() {
    const [loading, setLoadng] = useState(true);
    const [data, setData] = useState([]);

    const [loadTeachers, setLoadTeacher] = useState([]);
    const [loadRooms, setLoadRoom] = useState(null);
    const [loadClsses, setLoadClss] = useState(null);
    

  const getTeachers = () =>{
    axios.get("http://localhost:8000/api/v1/teachers").then((r) => {
      setLoadTeacher(r.data.data);
      
    });
  }
  // console.log(loadTeachers);

  const getRooms = () =>{
    axios.get("http://localhost:8000/api/v1/rooms").then((r) => {
      setLoadRoom(r.data.data);
  });
}

const getClsses = () =>{
  axios.get("http://localhost:8000/api/v1/classes").then((r) => {
    setLoadClss(r.data.data);
    // console.log(r.data.data);
  });
}

  useEffect(() => {
      if (loadTeachers.length === 0) {
        getTeachers();
      }

      if (loadRooms === null) {
        getRooms();
      }

      if (loadClsses === null) {
        getClsses();
      }

      if(loadTeachers!=null && loadRooms !=null && loadClsses !=null){
        setLoadng(false);
      }
    }, [loadTeachers, loadRooms, loadClsses]);


    const weeks = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан' ];
    const column = ['Багш-хичээл', 'Анги-бүлэг'];
  
    const changeData = (key, index, value) =>{
      // console.log(key, index, value)
      var a = [...data];
      a[index][key] = value;
      setData(a);
    }
    const deleteData = (index) =>{
      var a = [...data];
      a.splice(index, 1)
      setData(a);
    }
    const addData = (roomId, weekIndex) => {
      var a = [...data];
      a.push({ room: roomId,  week: weekIndex, teacher: null, class: null })
      setData(a);
    }

    const listData = (d, i, roomId, weekIndex) =>{
      if(weekIndex === d.week && d.room === roomId){
        return  (<tr key={`row${i}-room${roomId}-week${weekIndex}`} >
        <td>
              <Select value={d.teacher} placeholder="багш хичээл" onChange={(e)=>{ changeData("teacher", i, e) }} >
                <Select.Option value={null}>Багш хичээл</Select.Option>
                {loadTeachers.map(teacher=> 
                  <Select.Option    value={teacher.id}>{teacher.name}</Select.Option>
                )}
              </Select>
        </td>
        <td className="col-6">
        <Select value={d.class} placeholder="анги бүлэг" onChange={(e)=>{ changeData("class", i, e) }} >
            <Select.Option value={null}>Анги бүлэг</Select.Option>
            {loadClsses.map(class1=>
              <Select.Option    value={class1.id}>{class1.name}</Select.Option>
              )}
        </Select>
        </td>
        <td>
          <Button icon={<DeleteOutlined />} onClick={()=>deleteData(i)} />
        </td>
      </tr>)
      }
    }
  
    return  !loading ? (<div  className="container mt-3 mb-3">
      Angi
  </div>) : (<div className="container text-center"><Spin /></div>);
  }
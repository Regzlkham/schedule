import React, { Component, useState, useEffect  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  Button, Spin,   Row, Col, Form, Select, Card, message, List} from 'antd';
import {DeleteOutlined , EditOutlined } from '@ant-design/icons';


export default function Home() {
  const [loading, setLoadng] = useState(true);
  const [data, setData] = useState([]);
  const weeks = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан' ];
  const [form, setForm] = useState({
    _id : null,
    cls: null,
    room: null,
    teacher: null,
    week: 0
  });

  const [loadTeachers, setLoadTeacher] = useState([]);
  const [loadRooms, setLoadRoom] = useState(null);
  const [loadClsses, setLoadClss] = useState(null);
  const [huviar, setHuviar] = useState(null);

  const resetForm = ()=>{
    setForm({
      _id : null,
      cls: null,
      room: null,
      teacher: null,
      week: 0
    });
  }

  const saveForm = ()=>{
  // console.log(form);
    if(form._id===null){
      axios.post("/api/v1/huviar", form).then((r) => {
        message.success('Амжилттай нэмэгдлээ');
          resetForm();
          setHuviar(null);
        }).catch((r)=>{ message.error('Алдаа гарлаа'); });
    } else {
      axios.put("/api/v1/huviar/"+form._id, form).then((r) => {
        message.success('Амжилттай хадгаллаа');
          resetForm();
          setHuviar(null);
        }).catch((r)=>{ message.error('Алдаа гарлаа');  });
      }
    }

  const deleteForm = (h)=>{
    axios.delete("/api/v1/huviar/"+h._id).then((r) => {
      message.success('Амжилттай устгалаа');
        resetForm();
        setHuviar(null);
      }).catch((r)=>{ message.error('Алдаа гарлаа');  }); 
    }

  const getHuviar = () =>{
    axios.get("api/v1/huviar").then((r) => {
      setHuviar(r.data.data);
    });
  }

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

  const getTeacherName = (teacher_id) =>{
    const teacher = loadTeachers.find((t)=> t._id === teacher_id);
    return teacher.name;
}

  const getClsName = (cls_id) =>{
    const cls = loadClsses.find((t)=> t._id === cls_id);
    return cls.name;
}

  const ShowHuviar = (week, room) => {
    console.log(week, room)
    return (<List>
      {huviar.map((h)=> (h.week===week && h.room ===room) ? 
  <List.Item  
    actions={[<a key="list-loadmore-edit" onClick={()=>setForm(h)}><EditOutlined /></a>, <a key="list-loadmore-more" onClick={()=>deleteForm(h)} ><DeleteOutlined /></a>]} >
      {getTeacherName(h.teacher)} - {getClsName(h.cls)}
  </List.Item>: ""
    )}
  </List>)
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

      if(huviar === null) {
        getHuviar();
      }
    }, [loadTeachers, loadRooms, loadClsses, huviar]);
  
    const changeFormValue = (key, value) =>{
      console.log(key, value);
      var a = {...form};
      a[key]= value;
      setForm(a);
    }
    
    return  !loading ? (<div  > 
    <Row  >
      <Col span={4}>
      <Card title={form._id ? "Хуваарь засах": "Хуваарь нэмэх"}>
          <Form layout="vertical">
            <Form.Item label="Анги сонгох">
              <Select  
                showSearch   
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }  
                value={form.cls}
                onChange={(e)=>changeFormValue('cls', e)}
                >
                  {loadClsses && loadClsses.map((c)=>(
                        <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                  ))}
                </Select>
            </Form.Item>
            <Form.Item label="Багш сонгох">
              <Select  
                showSearch   
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }  
                value={form.teacher}
                onChange={(e)=>changeFormValue('teacher',e)}
                >
                {loadTeachers && loadTeachers.map((c)=>(
                        <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                  ))}
                </Select>
            </Form.Item>
            <Form.Item label="Гараг сонгох">
              <Select  
                showSearch   
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }  
                value={form.week}
                onChange={(e)=>changeFormValue('week',e)}
                >
                  {weeks.map((c,i)=>(
                        <Select.Option key={i} value={i}>{c}</Select.Option>
                  ))}
                </Select>
            </Form.Item>
            <Form.Item label="Өрөө сонгох">
              <Select  
                showSearch   
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }  
                value={form.room}
                onChange={(e)=>changeFormValue('room', e)}
                >
                {loadRooms && loadRooms.map((c)=>(
                        <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                  ))}
                </Select>
            </Form.Item>
              <Button type="primary" htmlType="submit" onClick={()=>saveForm()} >
                Хадгалах
              </Button>
              <Button  style={{marginLeft:15}} onClick={()=>resetForm()} >
              Цуцлах
              </Button>
            </Form>
        </Card>
      </Col>
      <Col span={20}>
        {/* {JSON.stringify(huviar)} */}
        {huviar && (
            <div className="calendar">
              <Row>
              <Col className="border border-title" span="2" offset={1}></Col>
                {weeks.map((week, i)=>(<Col span="4" key={i} className="border  border-title">{week}</Col>))} 
              </Row>
            
              {loadRooms && loadRooms.map((room)=>(
                <Row key={room._id}>
                <Col className="border border-title"  span="2" offset={1}>{room.name}</Col>
                  {weeks.map((week, i)=>(<Col span="4" key={i} className="border">
                    
                    {ShowHuviar(i, room._id)}
                  </Col>))} 
                </Row>
              ))}
              </div>
          )}
      </Col>
  </Row>

  </div>) : (<div className="container text-center"><Spin /></div>);
  }
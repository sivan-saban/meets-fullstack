import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GroupModel from "../../model/GroupModel";
import MeetModel from "../../model/MeetModel";
import "./AddMeet.css";

function AddMeet(): JSX.Element {
    const [ groups, serGroups ] =  useState<GroupModel[]>([]);
    const { register, handleSubmit } = useForm<MeetModel>();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3001/meets/groups")
        .then(response=>{
            serGroups(response.data);
        })
    }, [])

    const send = async(newMeet:MeetModel)=>{
            try{
                //בדיקה אם קיימת פגישה
                await axios.post("http://localhost:3001/meets/Check_time",newMeet)
                .then(res=>{
                    const result = res.data;
                    // אם קיימת תוסיף
                    if(result===0){
                        axios.post("http://localhost:3001/meets/add",newMeet)
                            .then(response=>navigate("/"));
                    }else{
                        alert("the date is already exist, please choose else date")
                    }
             })
        }catch(err:any){
                console.log(err.message);
            }
            //zeev! if the check date is wrong, so please take care to this try{} thank you, I hoop its good!
        // try{
        //     await axios.post("http://localhost:3001/meets/add",newMeet)
        //     .then(response=>{
        //         console.log(newMeet);
        //         navigate("/");
        //     })
        // }catch(err:any){
        //     console.log(err.message);
        // }
     };

        return (
        <div className="AddMeet Box">
			<form onSubmit={handleSubmit(send)}>
                <h2>Add Meet</h2>
                <select defaultValue="" required {...register("group_name")}>
                    <option disabled selected value="">choose group... </option>
                    {groups.map(item=>
                        <option key={item.id} value={item.id}>{item.group_name}</option>
                    )}
                </select>
                <label>start date</label>
                <input type="datetime-local" required {...register("start_date")}/>
                <label>end date</label>
                <input type="datetime-local" required {...register("end_date")}/>
                <label>memo</label>
                <input type="text" required {...register("memo")}/>
                <label>room</label>
                <input type="text" required {...register("room")}/>
                <button value="add meet">add meet</button>
            </form>
        </div>
    );
}
export default AddMeet;

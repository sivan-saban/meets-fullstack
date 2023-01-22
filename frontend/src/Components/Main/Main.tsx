import axios from "axios";
import { useEffect, useState } from "react";
import GroupModel from "../../model/GroupModel";
import MeetModel from "../../model/MeetModel";
import "./Main.css";

function Main(this: any): JSX.Element {
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [meets, setMeets] = useState<MeetModel[]>([]);
    useEffect(() => {
        axios.get("http://localhost:3001/meets/groups")
        .then((response)=>{setGroups(response.data)
        console.log(response.data);
        })
    }, []);

    const getSelect = async (new_group:number)=>{
        console.log(new_group)
        await axios.get(`http://localhost:3001/meets/all/${new_group}`)
        .then((response)=>{setMeets(response.data)})
    };

    return (
        <div className="Main">
        
            <select onChange={(args)=>{getSelect(parseInt(args.target.value))}}>
                <option disabled  >select group</option>
                    {groups.map(item=>
                        <option key={item.id} value={item.id}>
                            {item.group_name}
                        </option>
                    )}
            </select>
            
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>group</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>memo</th>
                        <th>room</th>
                        <th>range</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {meets.map(item=>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.group_name}</td>
                        <td>{new Date(item.start_date).toString()}</td>
                        <td>{new Date(item.end_date).toString()}</td>
                        <td>{item.memo}</td>
                        <td>{item.room}</td>
                        <td>
                            {new Date(item.end_date).getDate() - new Date(item.start_date).getDate()} days
                            {new Date(item.end_date).getTime() - new Date(item.start_date).getTime()} minutes
                        </td>
                        <td>
                            <button onClick={() => {
                                axios.delete(`http://localhost:3001/meets/delete/${item.id}`);
                                setMeets(meets.filter((singleMeet) => singleMeet.id !== item.id));
                                }}>🗑
                            </button>
                        </td>
                    </tr> )}
                </tbody>
            </table>
        </div>
    );
}
export default Main;

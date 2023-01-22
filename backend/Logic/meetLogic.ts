import { OkPacket } from "mysql";
import GroupModel from "../model/GroupModel";
import MeetModel from "../model/MeetModel";
import dal from "../Utils/dal_mysql";

//all groups
const getAllGroups = async ():Promise<GroupModel[]> => {
    const sql = "SELECT * FROM group_team";
    const groups = await  dal.execute(sql);
    return groups;
};


//all meets by id
const getAllMeetsByGroup = async (id:number):Promise<MeetModel[]> => {
    const sql = `
        SELECT meets.* , group_team.group_name
        FROM meets JOIN group_team
        ON meets.group_name = group_team.id
        WHERE meets.group_name=${id}
    `;
    const meets = await dal.execute(sql);
    return meets;
};

//add meet
const addMeet = async(newMeet:MeetModel):Promise<MeetModel> => {
    const sql = `
        INSERT INTO meets (group_name, start_date, end_date, memo, room) 
        VALUES (${newMeet.group_name}, '${newMeet.start_date}', '${newMeet.end_date}', 
                '${newMeet.memo}', '${newMeet.room}')
    `;
    const response: OkPacket = await dal.execute(sql);
    newMeet.id = response.insertId;
    return newMeet;
};

//delete meet
const deleteMeet = async (id:number):Promise<void> => {
    const sql = `
        DELETE FROM meets
        WHERE id=${id}
    `;
    const response = await dal.execute(sql);
}

const checkTime = async (meet:MeetModel):Promise<number> => {
    const sql = `
            SELECT meets.* , group_team.group_name
            FROM meets JOIN group_team
            ON meets.group_name = group_team.id
            WHERE '${meet.start_date}' 
            BETWEEN start_date and end_date
        `;
        const response = await dal.execute(sql);
        console.log(response.length);
        if(response.length > 0){
            return 1;
        }
        else{
            return 0;
        }

}


export default {
    getAllGroups,
    getAllMeetsByGroup,
    addMeet,
    deleteMeet,
    checkTime
};
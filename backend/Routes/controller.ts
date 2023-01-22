import express, {NextFunction, Request, Response} from 'express';
import meetLogic from '../Logic/meetLogic';

const router = express.Router();

//all groups
router.get("/groups", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await  meetLogic.getAllGroups());
});

//all meets by group
router.get("/all/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await  meetLogic.getAllMeetsByGroup(id));
});

//add meet
router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    const meet = request.body;
    response.status(201).json(await meetLogic.addMeet(meet));
});

//delete meet
router.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(204).json(await  meetLogic.deleteMeet(id));
});

router.post("/Check_time", async (request: Request, response: Response, next: NextFunction) => {
    const meet = request.body;
    response.status(200).json(await meetLogic.checkTime(meet));
});



export default router;
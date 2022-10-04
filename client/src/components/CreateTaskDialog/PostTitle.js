import React from 'react';
import TextField from "@mui/material/TextField";
import Item from "../Accordion/Item";
import LabeledCheckBox from "../LabeledCheckBox/LsbeledCheckBox";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";

const PostTitle = () => {
    const {task, setTask} = useTasksContext();
    return (
        <Item title='Title'
              description={task[TASK_FIELDS.tagTitle]}>
            <TextField
                label="RegExp"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.tagTitle]: event.target.value
                })}
                defaultValue={task[TASK_FIELDS.tagTitle]}
            />
            <TextField
                label="Index of results"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.arraysIndex]: event.target.value < 0 ? 0 : event.target.value
                })}
                value={task[TASK_FIELDS.arraysIndex]}
                type="number"
            />
            <LabeledCheckBox
                label='Strong search'
                onChange={(event) => setTask({
                    [TASK_FIELDS.isStrongSearch]: event.target.checked
                })}
                checked={task[TASK_FIELDS.isStrongSearch]}
            />
        </Item>
    );
};

export default PostTitle;
import React from 'react';
import TextField from "@mui/material/TextField";
import Item from "../Accordion/Item";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";

const WordpressSettings = () => {
    const {task, setTask} = useTasksContext();
    return (
        <Item title='API settings'
              description={task[TASK_FIELDS.wordpressUrl]}>
            <TextField
                label="API"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.wordpressUrl]: event.target.value
                })}
                defaultValue={task[TASK_FIELDS.wordpressUrl]}
            />
            <TextField
                label="API username"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.username]: event.target.value
                })}
                defaultValue={task[TASK_FIELDS.username]}
            />
            <TextField
                label="API password"
                variant="outlined"
                type='password'
                onChange={(event) => setTask({
                    [TASK_FIELDS.password]: event.target.value
                })}
                defaultValue={task[TASK_FIELDS.password]}
            />
        </Item>
    );
};

export default WordpressSettings;
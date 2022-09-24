import React from 'react';
import Item from "../Accordion/Item";

import {JsonURLsParser, XmlURLsParser} from "../../helpers/URLsParser";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {useSnackbar} from "notistack";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";

const SiteMap = () => {
    const {task, setTask} = useTasksContext();
    const {enqueueSnackbar} = useSnackbar()

    const handleLoad = (parser) => ({target: {files}}) => {
        parser
            .parse(files[0])
            .then((urls) => {
                setTask({[TASK_FIELDS.urls]: urls});
                enqueueSnackbar(`Loaded ${urls.length} url(s)`, {variant: 'success'})
            });
    }

    return (
        <Item title='Sitemap' description={`Loaded ${task[TASK_FIELDS.urls].length} urls`}>
            <LoadingButton variant="contained" component="label">
                JSON
                <input
                    type="file"
                    hidden
                    onChange={handleLoad(new JsonURLsParser())}
                />
            </LoadingButton>
            <LoadingButton variant="contained" component="label">
                XML
                <input
                    type="file"
                    hidden
                    onChange={handleLoad(new XmlURLsParser())}
                />
            </LoadingButton>
        </Item>
    );
};

export default SiteMap;
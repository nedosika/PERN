import React from 'react';
import {DIALOGS, useDialogContext} from "../../contexts/DialogContext";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Slide from "@mui/material/Slide";
import useTasks from "../../hooks/useTasks";
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'
import MailIcon from '@mui/icons-material/Mail';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

const ReportDialog = ({id}) => {
    const {dialogs: {[DIALOGS.reportDialog]: isOpen}, toggleDialog} = useDialogContext();
    const {task, tasks} = useTasks(id);

    console.log(task)

    const closeDialog = () =>
        toggleDialog(DIALOGS.reportDialog)

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={closeDialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Report
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closeDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    margin: '20px auto',
                    '& > :not(style)': {m: 1, width: '30ch'}
                }}
            >
                <TreeView
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >
                    <StyledTreeItem nodeId="1" labelText="Added posts" labelIcon={MailIcon} labelInfo="2294">
                        <StyledTreeItem
                            nodeId="70"
                            labelText="Post 1"
                            labelIcon={MailIcon}
                            labelInfo="3,566"
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        />
                        <StyledTreeItem
                            nodeId="71"
                            labelText="Post 2"
                            labelIcon={MailIcon}
                            labelInfo="3,566"
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        />
                        <StyledTreeItem
                            nodeId="72"
                            labelText="Post 3"
                            labelIcon={MailIcon}
                            labelInfo="3,566"
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        />
                        <StyledTreeItem
                            nodeId="73"
                            labelText="Post 4"
                            labelIcon={MailIcon}
                            labelInfo="3,566"
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="3" labelText="Errors" labelIcon={InfoIcon} labelInfo="300">
                        <StyledTreeItem
                            nodeId="50"
                            labelText="Title not found"
                            labelIcon={ForumIcon}
                            labelInfo="90"
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                        >
                            <StyledTreeItem
                                nodeId="80"
                                labelText="Post 1"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="81"
                                labelText="Post 2"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="60"
                            labelText="Slug not found"
                            labelIcon={LocalOfferIcon}
                            labelInfo="2,294"
                            color="#e3742f"
                            bgColor="#fcefe3"
                        >
                            <StyledTreeItem
                                nodeId="90"
                                labelText="Post 1"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="91"
                                labelText="Post 2"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="40"
                            labelText="Post not found"
                            labelIcon={MailIcon}
                            labelInfo="3,566"
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        >
                            <StyledTreeItem
                                nodeId="100"
                                labelText="Post 1"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="101"
                                labelText="Post 2"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="102"
                                labelText="Post 1"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="103"
                                labelText="Post 2"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="120"
                            labelText="Other error"
                            labelIcon={SupervisorAccountIcon}
                            labelInfo="733"
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        >
                            <StyledTreeItem
                                nodeId="130"
                                labelText="Post 1"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                            <StyledTreeItem
                                nodeId="131"
                                labelText="Post 2"
                                labelIcon={MailIcon}
                                labelInfo="3,566"
                                color="#a250f5"
                                bgColor="#f3e8fd"
                            />
                        </StyledTreeItem>
                    </StyledTreeItem>
                </TreeView>
            </Box>
        </Dialog>
    );
};

export default ReportDialog;


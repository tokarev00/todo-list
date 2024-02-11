import './App.css';
import { TaskType, TodoList } from "./TodoList";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from "./AddItemForm";
import { addTodoListAC } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function AppWithRedux() {

    const dispatch = useDispatch();


    let todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);

    function addTodoList(listTitle: string) {
        const action = addTodoListAC(listTitle);
        dispatch(action);
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm initText="New Todo List" onAddItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        id={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>);
}

export default AppWithRedux;

import React from "react";
import "./assets/css/style.css";
import { connect } from "react-redux";
import "../node_modules/antd/dist/antd.css";
import MainComponent from "./components/mainComponent";
import { addUser, getUsers, deleteUser, editUser } from "./actions/userActions";

function App(props) {
    return (
        <div className="body">
            <MainComponent {...props} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    getUsers,
    addUser,
    deleteUser,
    editUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

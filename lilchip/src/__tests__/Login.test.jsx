import React from "react";
import { fireEvent, render, screen, } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login/Login";


test("renders Login without crashing", () => {
    render(
        <Router>
            <Login />
        </Router>)
    expect(screen.getByText("Log in")).toBeInTheDocument();
})

test("handles input changes correctly", () => {
    render(
        <Router>
            <Login />
        </Router>)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testUser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPassword" } });

    expect(screen.getByPlaceholderText("Username").value).toBe("testUser")
    expect(screen.getByPlaceholderText("Password").value).toBe("testPassword")
})

test("validates input errors empty", async () => {
    render(
        <Router>
            <Login />
        </Router>);
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "" } });

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
})

test("validates input errors wrong input", async () => {
    render(
        <Router>
            <Login />
        </Router>);
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "WrongUsername" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "WrongPassword" } });

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText("Incorrect username or password")).toBeInTheDocument();
})

test("handles login goes correctly", () => {


    render(
        <Router>
            <Login />
        </Router>);
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Test_User" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Test_Password" } });
    fireEvent.click(screen.getByText("Login"));

})
import React from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'
import Profile from './Profile'
import ToggleSwitch from './ToggleSwitch'

const Container = styled.div`
    background-color: white;
    position: fixed;
    left: 0;
    top: 7rem;
    bottom: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border : 2px solid black;
    box-shadow: 0px 0px 3px #555;


`

const Sidebar = () => {

    return (
        <Container>
            <Profile />
            <Menu />
            <ToggleSwitch />
        </Container>
    )
}

export default Sidebar

import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../assets/theme';
import styled from 'styled-components';
import { Button } from '../../../basicComponents';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    height:100%;
    margin:30px 100px;
    display:flex;
    justify-content:center;
    align-items:center;

    @media only screen and (max-width: 1024px){
        margin:30px 80px;
    }

    @media only screen and (max-width: 768px){
        margin:30px 20px;
    }
`;

const MainContainer = styled.div`
    width:100%;
`;

const SectionName = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    font-weight:bold;
    font-size:20px;
`;

const Tr = styled.tr`
    width : 100% ;
    height : 30px;
    border-bottom: 1px solid ${COLORS.lightPurple};
`;

const Th = styled.th`
    width : 200px;
    height : 40px;
    background-color : ${COLORS.lightPurple};
    color : ${COLORS.white};

    &:nth-child(1){
        width:0px;
        text-align : left;
    }
`;

const Td = styled.td`
    width : 200px;
    height : 20px;
    text-align : center;
    padding:10px 0;

    &:nth-child(1){
        width:0px;
        text-align : left;

    }
`;

const Posts = () => {

    const URL = "http://localhost:8080/api/";
    const IMAGEPATH = "http://localhost:8080/uploads/";

    const postsData = [
        {
            "post_id": 1,
            "categorie": "Tarte",
            "titre": "Tarte mickey mouse",
            "image": "back1.png",
        },
        {
            "post_id": 2,
            "categorie": "Tarte",
            "titre": "Tarte spiderman",
            "image": "back1.png",
        },
        {
            "post_id": 3,
            "categorie": "Cupcake",
            "titre": "fraise Cupcakes",
            "image": "back1.png",
        },
        {
            "post_id": 4,
            "categorie": "Lolipop",
            "titre": "Batman lolipops",
            "image": "back1.png",
        },
    ]

    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get(`${URL}posts`).then(res => {
            if(res.data.length > 0 )
                setPosts(res.data)
        });
    }

    useEffect( () => {
        fetchPosts();
    }, [])

    return (
        <Container>
            <MainContainer>
                <SectionName>
                    <NavLink to="/posts/add">
                        <Button width="150px" textColor="white" text="Ajouter" bgColor={COLORS.purple} />
                    </NavLink>
                    Postes
                </SectionName>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '30px'
                    }}
                >
                    <div style={{
                        width: "100%",
                        height: "70vh",
                        overflowY: "scroll",
                    }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}
                        >
                            <thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Categorie</Th>
                                    <Th>Evenement</Th>
                                    <Th>Description</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <Tr key={post.id_post}>
                                        <Td>
                                            <img src={IMAGEPATH+post.image} alt=""
                                                style={{
                                                    width: "100px"
                                                }}
                                            />
                                        </Td>
                                        <Td> {post.categorie} </Td>
                                        <Td> {post.evenement} </Td>
                                        <Td> {post.description} </Td>
                                        <Td>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <NavLink to={`/posts/edit/${post.id_post}`}>
                                                    <Button bgColor={COLORS.purple} text="Modifier" textColor={COLORS.white} width="130px" />
                                                </NavLink>
                                                <Button bgColor={COLORS.red} text="Supprimer" textColor={COLORS.white} width="130px" />
                                            </div>

                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainContainer>
        </Container>
    );
}

export default Posts;

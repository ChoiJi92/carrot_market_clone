import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import instance from '../shared/axios';
import { orange } from '@mui/material/colors';


const Like = ({like}) => {
    const [isloaded, setIsloaded] = useState(true);
    const user_name = localStorage.getItem('user_name');
    const [heart_count, setHeart_count] = useState(0);
    // const [heartUser, setHeartUser] = useState([]);

    // 좋아요 추가
    // const addLike = async () => {
    //     await instance.post(`/like/${data}`, {
    //         contentId: data,
    //         nickName: user_name,
    //     });
    //     setHeart_count(heart_count + 1);
    //     setHeartUser([...heartUser, user_name]);
    // };
    // // 좋아요 취소
    // const deleteLike = async () => {
    //     await instance.delete(`/api/post/${data}/unlike`);
    //     setHeart_count(heart_count - 1);
    //     setHeartUser(heartUser.filter((v) => v !== user_name));
    // };
    const color = orange[500];
    return (
        <>
            {isloaded && (
                <div>
                     
                        <FavoriteBorderIcon
                            // onClick={addHeart}
                            fontSize="medium"
                            cursor="pointer"
                            style={{color:color}}
                        ></FavoriteBorderIcon>
                
                        {/* <FavoriteIcon
                            style={{color:color}}
                            // onClick={deleteHeart}
                            fontSize="medium"
                            cursor="pointer"
                        ></FavoriteIcon> */}
                    
                    {/* <div>좋아요 {heart_count}개</div> */}
                </div>
            )}
        </>
    );
};

export default Like;
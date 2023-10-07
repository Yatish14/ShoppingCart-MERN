import {AiFillStar,AiOutlineStar} from "react-icons/ai";

export const Ratings = ({rating,style,onClick}) => {
  return (
    <span>
        {
            [...Array(5)].map((_, i) => {
                return(
                    <span key={i} style={style} onClick={() => onClick(i)}>
                        {rating > i ? (<AiFillStar/>) : (<AiOutlineStar/>)}
                    </span>
                )
            })
        }
    </span>
  )
}
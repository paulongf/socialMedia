import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { 
  useQuery 
  ,useMutation,
  useQueryClient,} 
  from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import moment from "moment"; 

const Comments = ({postId}) => {
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(AuthContext);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => makeRequest.get("/comments?postId="+postId).then(res => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });
  

  const handleClick = async (e) =>{
    e.preventDefault();
    mutation.mutate({description, postId});
    setDescription("");
  };


  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" value={description} placeholder="write a comment" onChange={e=>setDescription(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading 
        ? "Loading" 
        : data.map((comment) => (
          <div className="comment" key={comment.id}> {/* Usando o id do comentário como chave */}
            <img src={comment.profilePicture} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.description}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      }
    </div>
  );
};

export default Comments;

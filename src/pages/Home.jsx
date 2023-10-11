import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Create</h1>
        <h1>Read</h1>
        <h1>Update</h1>
        <h1>Delete</h1>
      </div>
      <div>
        <h1>About My Project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto laudantium dignissimos voluptatum consectetur quo voluptatem, veritatis minima! Quaerat sunt eos officia veniam fugit velit explicabo similique rerum, accusamus repellendus expedita cum fugiat laboriosam in sint accusantium ad voluptatem. Cum fugit eius omnis excepturi magni quo error delectus unde doloremque, ipsum qui pariatur hic modi veniam mollitia expedita nisi voluptatem adipisci. Nostrum atque vero repellat doloremque modi architecto excepturi aliquam aperiam assumenda sapiente voluptatibus, maxime libero ullam sequi delectus dolore ut accusamus asperiores quae porro rem vel officiis soluta error. Architecto tenetur molestias tempore culpa adipisci quaerat distinctio, saepe commodi eaque consectetur atque qui nulla ab harum dolore blanditiis, sequi deserunt? Temporibus, officiis molestiae, cum, quo vero inventore provident est rem corporis veritatis eius vitae! Nulla qui dignissimos sed eius, officiis temporibus aut maiores, sit amet aperiam totam illum! Provident deleniti incidunt quod obcaecati numquam a laborum maxime, ipsam eos ab perferendis debitis dolore doloribus tempore labore voluptate, animi omnis placeat dolorum earum? Illum nemo nam odio exercitationem? Assumenda hic corrupti aperiam, iste suscipit doloribus aspernatur saepe dolores magnam perspiciatis dolorem. Temporibus praesentium ullam similique? Sequi autem repellat consectetur nobis cumque! Quibusdam animi eaque quidem cumque voluptatum cum aliquam similique, illum explicabo nostrum nihil est voluptates quasi eius debitis esse ab pariatur distinctio molestias perspiciatis fuga in eligendi tempora. At, quis quo veniam atque consequuntur id tenetur, nam illo harum excepturi corrupti consequatur perferendis sint commodi officia rerum fugit obcaecati iusto voluptates sapiente earum vel modi? Natus quae neque, laboriosam consequuntur expedita praesentium, nobis ratione repudiandae, at excepturi accusantium tempore vel voluptatum maxime soluta rem autem numquam quis ad fugiat ut consectetur perspiciatis consequatur maiores. Voluptas ex odit asperiores doloribus atque aspernatur veniam sed. Sed accusantium repudiandae nostrum excepturi perspiciatis pariatur repellendus quisquam iusto adipisci, corporis assumenda! Natus corporis numquam facilis eaque voluptates voluptatum, quis provident! Omnis officiis sequi quis accusamus ratione. Reiciendis error quaerat voluptas aliquid earum quia, tempore quasi voluptatibus?
        </p>
        <div>
          <button>
            <Link>Get All Users</Link>
          </button>
          <button>
            <Link> Create A User</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

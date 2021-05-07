// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async (req, res) => {
  res.statusCode = 200;
  const promises = [];
  const finalResult = [];
  try {
    if (req.method === "GET") {
      let resp = await axios.get(
        `https://hacker-news.firebaseio.com/v0/${req.query.type}.json?print=pretty`
      );
      let results = resp.data;
      results.forEach((element) => {
        promises.push(
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
          )
        );
      });
      let data = await Promise.all(promises);
      data.forEach((value, index) => {
        finalResult.push(data[index].data);
      });
      res.status(200).json({ data: finalResult });
    }
    if (req.method === "POST") {
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/user/${req.query.name}.json?print=pretty`
        )
        .then((resp) => {
          res.status(200).json({ data: resp.data });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: error });
  }
};

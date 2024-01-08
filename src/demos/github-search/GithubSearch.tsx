import { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();


const GithubSearch = () => {
  const [results, setResults] = useState<any[]>([])
  const [searchKeyword, setSearchKeyword] = useState("123");

  async function search(_:any) {
    const r = await octokit.rest.search.repos( {q: `${searchKeyword} in:name`})
    console.log(r)
    if(r.status === 200) {
      setResults(r.data.items)
    }
  }

  return (
    <>
    <div className='searchbar'>
      <input type='text' value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)}></input>
      <button type='submit' onClick={search}>Submit</button>
    </div>
    <p><b>Instructions : </b> Enter keyword on click submit to see matching repositories. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/github-search' target='_blank'><FaGithub /></a></p>
    <div className='grid'>
      { results.map(result => (
        <div className='card' key={result.node_id}>
          <p>
            {result.name}
          </p>
          <p>
            {result.owner.login}
          </p>
          </div>
      ))}
    </div>
    </>
  );
};

export default GithubSearch;

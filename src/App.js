import './styles/App.css';
import './styles/basicComponents.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Input, Select, TextArea, UploadFile } from './basicComponent';
import { COLORS } from './assets/theme';
import { useState } from 'react';

function App() {

  const [data, setData] = useState({
    'username': 'oussama',
    'desc': '',
    'image': '',
  });

  const options = ["test1", 'test2', "test3"];

  return (
    <Router>
      <div>
        <Button width="200px" bgColor={COLORS.purple} text="Click me" />
        <Input label="username" name="username" data={data} setData={setData} width="200px" />
        <Select label="ok" options={options} width="200px" name="ok" data={data} setData={setData} />
        <TextArea label="desc" name="desc" rows="7" width="400px" data={data} setData={setData} />
        <UploadFile data={data} setData={setData} name="image" />
        <p>Start your developement very easy peasy</p>
      </div>
      <div>
        <pre>
          {
          // JSON.stringify(data.image, null, 2)
          console.log(data)
          }
        </pre>
      </div>
    </Router>
  );
}

export default App;

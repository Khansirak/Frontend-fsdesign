
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Menu from './components/menu';
import Phase from './components/phase';
import Equipement from './components/equipement';
import Interlock from './components/interlock';
import Description from './components/description';
import Parameter from './components/parameter';
import Signals from './components/signals';
import Alarmprompt from './components/alarmprompt';
import Logic from './components/logic';
import Library from './components/library';
import Graph from './components/graph';
import  SaveRestore from './components/flow';
import  PDFPreview from './components/pdf';
import Project from './components/project'


const App = () => (
  <>

    <Nav />
    {/* <ImageProvider> */}
    {/* <DataProvider> */}
    
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route exact path="/phase/:id" element={<Phase />} />
      <Route exact path="/equipemen-module" element={<Equipement />} />
      <Route exact path="/interlock-module" element={<Interlock />} />
      <Route exact path="/description/:id" element={<Description />} />
      <Route exact path="/parameter/:id" element={<Parameter />} />
      <Route exact path="/signals/:id" element={<Signals />} />
      <Route exact path="/alarmprompt/:id" element={<Alarmprompt />} />
      <Route exact path="/logic/:id" element={<Logic />} />
      <Route exact path="/library" element={<Library />} />
      <Route exact path="/graph/:id" element={<Graph />} />
      <Route exact path="/pdf/:id" element={<PDFPreview />} />
      <Route exact path="/try" element={<SaveRestore />} />
    </Routes>
    {/* </ImageProvider> */}

    {/* </DataProvider> */}
  </>
);

export default App;

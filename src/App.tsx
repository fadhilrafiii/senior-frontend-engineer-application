import { Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/layout.component';
import LoadingScreen from '@components/loading/loading-screen.component';

import AnamnesisCreatePage from './pages/anamnesis/create/anamnesis-create.page';
import AnamnesisDetailPage from './pages/anamnesis/detail/anamnesis-detail.page';
import AnamnesisEditPage from './pages/anamnesis/edit/anamnesis-edit.page';
import AnamnesisListPage from './pages/anamnesis/list/anamnesis-list.page';

function App() {
  return (
    <div className="flex w-full">
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/anamnesis" replace />} />
              <Route path="/anamnesis">
                <Route index element={<AnamnesisListPage />} />
                <Route path="create" element={<AnamnesisCreatePage />} />
                <Route path=":id">
                  <Route index element={<AnamnesisDetailPage />} />
                  <Route path="edit" element={<AnamnesisEditPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

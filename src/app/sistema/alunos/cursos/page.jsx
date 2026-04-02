import React, { Suspense } from 'react';
import Alunos from './Alunos';

export default function InscricaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Alunos />
    </Suspense>
  );
}

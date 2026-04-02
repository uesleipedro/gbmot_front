import React, { Suspense } from 'react';
import GerenciarTurma from './GerenciarTurma';

export default function InscricaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <GerenciarTurma />
    </Suspense>
  );
}

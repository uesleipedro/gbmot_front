import React, { Suspense } from 'react';
import InscricaoContent from './InscricaoContent';

export default function InscricaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InscricaoContent />
    </Suspense>
  );
}

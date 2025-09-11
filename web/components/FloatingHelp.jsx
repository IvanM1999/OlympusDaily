import React, { useState } from "react";

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="floating-help" onClick={() => setOpen(true)} title="Ajuda">?</div>

      {open && (
        <div className="help-modal">
          <div className="help-content">
            <button className="close-btn" onClick={() => setOpen(false)}>Fechar</button>
            <h2>Manual rápido</h2>
            <p><strong>Cadastro:</strong> Crie sua conta via API ou use o seed inicial.</p>
            <p><strong>Criar entrada:</strong> Escreva título, clique em <em>Autocompletar</em> e depois em <em>Salvar</em>.</p>
            <p><strong>Rádio:</strong> Use o player no rodapé para ouvir músicas durante o uso.</p>
            <p>Manual completo em <a href="/manual" target="_blank">/manual</a>.</p>
          </div>
        </div>
      )}
    </>
  );
}
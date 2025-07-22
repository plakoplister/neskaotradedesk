// Version simplifiée pour test rapide
export const generateSimplePDF = () => {
  try {
    // Import dynamique de jsPDF seulement quand nécessaire
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      // Page de titre simple
      doc.setFontSize(20);
      doc.text('NESKAO TRADE DESK', 105, 60, { align: 'center' });
      doc.setFontSize(16);
      doc.text('RAPPORT COMPLET', 105, 80, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 100, { align: 'center' });
      
      // Contenu simple
      doc.setFontSize(14);
      doc.text('RECOMMANDATION: PARIS', 20, 140);
      doc.setFontSize(11);
      doc.text('Score: 8.09/10', 20, 160);
      doc.text('EBITDA An1: +0.52M€', 20, 180);
      doc.text('ROI 3 ans: 171.6%', 20, 200);
      
      // Téléchargement
      const filename = `NESKAO_Rapport_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '.')}.pdf`;
      doc.save(filename);
    }).catch(error => {
      console.error('Erreur import jsPDF:', error);
      alert('Erreur lors du chargement des outils PDF');
    });
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    alert('Erreur lors de la génération du PDF');
  }
};

export default generateSimplePDF;
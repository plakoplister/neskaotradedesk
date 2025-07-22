export const generateTestPDF = async () => {
  try {
    // Import dynamique pour éviter les problèmes de chargement
    const jsPDF = (await import('jspdf')).default;
    
    const doc = new jsPDF();
    
    // Page simple de test
    doc.setFontSize(20);
    doc.text('Test Export PDF Neskao', 20, 30);
    
    doc.setFontSize(12);
    doc.text('Si vous voyez ce PDF, l\'export fonctionne !', 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 70);
    
    // Retourner le blob
    return doc.output('blob');
  } catch (error) {
    console.error('Erreur dans generateTestPDF:', error);
    throw error;
  }
};
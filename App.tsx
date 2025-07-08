import React, { useState, useEffect, useCallback } from 'react';
import { AbsenceRecord } from './types';
import AbsenceForm from './components/AbsenceForm';
import HistoryLog from './components/HistoryLog';
import ReportGenerator from './components/ReportGenerator';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import Dashboard from './components/Dashboard';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const App: React.FC = () => {
  const [records, setRecords] = useState<AbsenceRecord[]>([]);
  const [view, setView] = useState<'registro' | 'dashboard'>('registro');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        console.log("🔵 Cargando registros desde Firestore...");
        const snapshot = await getDocs(collection(db, 'reemplazos'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AbsenceRecord[];
        console.log("✅ Registros cargados:", data.length);
        setRecords(data);
      } catch (error) {
        console.error("❌ Error loading records from Firestore", error);
      }
    };
    fetchRecords();
  }, []);

  // Función de prueba para verificar Firebase
  const testFirebase = async () => {
    console.log("🧪 Probando Firebase directamente...");
    try {
      const testData = {
        test: "Prueba directa",
        timestamp: Timestamp.now(),
        date: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, "test"), testData);
      console.log("✅ Prueba exitosa! ID:", docRef.id);
      alert("¡Firebase funciona! Revisa la consola y tu base de datos");
    } catch (error) {
      console.error("❌ Error en prueba:", error);
      alert("Error: " + error.message);
    }
  };

  const handleAddRecord = useCallback(async (data: Omit<AbsenceRecord, 'id' | 'status'>) => {
    console.log("🔵 Iniciando guardado...");
    console.log("📝 Datos recibidos:", data);
    
    const status = data.absentSubject.trim().toLowerCase() === data.replacementSubject.trim().toLowerCase()
      ? "Hora realizada"
      : "Hora cubierta, pero no realizada";
    
    const recordData = {
      ...data,
      status,
      timestamp: Timestamp.now(),
    };
    
    console.log("📦 Datos a guardar:", recordData);
    console.log("🔥 DB instance:", db);
    
    try {
      console.log("⏳ Intentando guardar en Firestore...");
      const docRef = await addDoc(collection(db, "reemplazos"), recordData);
      console.log("✅ Guardado exitoso! ID:", docRef.id);
      
      const newRecord: AbsenceRecord = {
        id: docRef.id,
        ...recordData,
      };
      
      setRecords(prevRecords => [newRecord, ...prevRecords]);
      console.log("✅ Estado local actualizado");
      
    } catch (error) {
      console.error("❌ Error saving record to Firestore", error);
      console.error("❌ Error details:", error.message);
    }
  }, []);

  const NavButton: React.FC<{
    targetView: 'registro' | 'dashboard';
    children: React.ReactNode;
  }> = ({ targetView, children }) => (
    <button
      onClick={() => setView(targetView)}
      className={`whitespace-nowrap py-3 px-4 text-sm font-medium transition-colors
        ${view === targetView
          ? 'border-b-2 border-indigo-600 text-indigo-600'
          : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* BOTÓN DE PRUEBA TEMPORAL */}
      <div className="bg-yellow-100 p-4 border-b">
        <div className="container mx-auto">
          <button 
            onClick={testFirebase} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
          >
            🧪 PROBAR FIREBASE
          </button>
          <span className="ml-4 text-sm text-gray-600">
            Haz clic aquí primero para probar la conexión
          </span>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-2 md:space-x-6" aria-label="Tabs">
              <NavButton targetView="registro">Registro e Historial</NavButton>
              <NavButton targetView="dashboard">Dashboard</NavButton>
            </nav>
          </div>
        </div>
        {view === 'registro' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <AbsenceForm onSubmit={handleAddRecord} />
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <ReportGenerator records={records} />
                <HistoryLog records={records} />
              </div>
            </div>
          </div>
        ) : (
          <Dashboard records={records} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { 
  FolderOpen, 
  UploadCloud, 
  FileText, 
  FileImage, 
  FileJson, 
  File, 
  Download, 
  Trash2, 
  Eye,
  HardDrive
} from 'lucide-react';
import { MOCK_FILES, simulateDelay } from '../../services/mockData';
import { FileItem } from '../../types';
import { Modal } from '../../components/Modal';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Files = () => {
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const { t } = usePreferences();

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'png': 
      case 'jpg': return <FileImage className="text-blue-500" size={24} />;
      case 'json': return <FileJson className="text-yellow-500" size={24} />;
      case 'docx': return <FileText className="text-blue-700" size={24} />;
      default: return <File className="text-slate-400" size={24} />;
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleUploadSimulate = async () => {
    setIsUploading(true);
    await simulateDelay(2000);
    const newFile: FileItem = {
        id: `f-${Date.now()}`,
        name: `Upload_${new Date().toLocaleTimeString()}.jpg`,
        size: '1.5 MB',
        type: 'JPG',
        uploadedAt: new Date().toISOString().split('T')[0]
    };
    setFiles([newFile, ...files]);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('files.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('files.subtitle')}</p>
        </div>
        <button 
            onClick={handleUploadSimulate}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium disabled:opacity-70"
        >
            {isUploading ? t('files.uploading') : <><UploadCloud size={18} /> {t('files.upload')}</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar / Stats */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        <HardDrive size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('files.storage')}</h3>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">2.4 GB used</span>
                        <span className="text-slate-900 dark:text-white font-medium">5 GB total</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full w-[48%]"></div>
                    </div>
                </div>
            </div>
            
            <div 
                className={`bg-white dark:bg-slate-800 border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUploadSimulate(); }}
                onClick={handleUploadSimulate}
            >
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UploadCloud size={24} />
                </div>
                <p className="font-medium text-slate-900 dark:text-white">{t('files.upload')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('files.drag_drop')}</p>
            </div>
        </div>

        {/* File List */}
        <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-3 font-semibold">{t('files.name')}</th>
                                <th className="px-6 py-3 font-semibold">{t('files.size')}</th>
                                <th className="px-6 py-3 font-semibold">{t('wallet.type')}</th>
                                <th className="px-6 py-3 font-semibold">{t('files.uploaded')}</th>
                                <th className="px-6 py-3 font-semibold text-right">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {files.map((file) => (
                                <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(file.type)}
                                            <span className="font-medium text-slate-900 dark:text-white">{file.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{file.size}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-mono">{file.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{file.uploadedAt}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => setPreviewFile(file)}
                                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded" 
                                                title="Preview"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-1.5 text-slate-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded" title="Download">
                                                <Download size={18} />
                                            </button>
                                            <button 
                                                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded" 
                                                title="Delete"
                                                onClick={() => handleDelete(file.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {files.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        <FolderOpen size={48} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                                        <p>{t('files.no_files')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>

      {/* File Preview Modal */}
      <Modal isOpen={!!previewFile} onClose={() => setPreviewFile(null)} title={previewFile?.name || 'Preview'} size="lg">
         <div className="flex flex-col items-center justify-center space-y-4 p-4 min-h-[300px] text-slate-900">
            {previewFile && (
                <>
                    {['jpg', 'png'].includes(previewFile.type.toLowerCase()) ? (
                         <img src="https://picsum.photos/600/400" alt="Preview" className="rounded-lg shadow-sm w-full object-cover" />
                    ) : (
                        <div className="w-full h-64 bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-500">
                             <FileText size={64} className="mb-4 text-slate-300" />
                             <p>{t('files.preview_na', {type: previewFile.type})}</p>
                        </div>
                    )}
                    <div className="w-full flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-100 mt-4">
                        <span>Size: {previewFile.size}</span>
                        <span>Uploaded: {previewFile.uploadedAt}</span>
                    </div>
                </>
            )}
         </div>
         <div className="flex justify-end pt-4 gap-2">
            <button 
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
                {t('common.close')}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Download
            </button>
         </div>
      </Modal>
    </div>
  );
};
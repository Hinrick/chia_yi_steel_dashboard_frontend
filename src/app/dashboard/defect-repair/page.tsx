'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { DefectRecord, DefectFormData, DEFECT_TYPES, SEVERITY_LEVELS, REPAIR_METHODS, INSPECTION_RESULTS } from '@/types/defect';

const sampleData: DefectRecord[] = [
  {
    id: 'DF-20251121-001',
    date: new Date('2025-11-21'),
    recorder: 'admin',
    defectType: '砂眼',
    location: 'A區-3號模具',
    severity: '中等',
    description: '表面發現多處砂眼',
    repairMethod: '打磨修補',
    materialUsed: '修補劑A',
    quantityUsed: 2.5,
    repairStartTime: '09:00',
    repairEndTime: '11:30',
    inspector: '張三',
    inspectionResult: '合格',
    remarks: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialFormData: DefectFormData = {
  date: new Date(),
  recorder: 'admin',
  defectType: '砂眼',
  location: '',
  severity: '中等',
  description: '',
  repairMethod: '焊接修補',
  materialUsed: '',
  quantityUsed: 0,
  repairStartTime: '',
  repairEndTime: '',
  inspector: '',
  inspectionResult: '合格',
  remarks: '',
};

export default function Page() {
  const [records, setRecords] = useState<DefectRecord[]>(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DefectRecord | null>(null);
  const [formData, setFormData] = useState<DefectFormData>(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleOpenDialog = (record?: DefectRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        date: record.date,
        recorder: record.recorder,
        defectType: record.defectType,
        location: record.location,
        severity: record.severity,
        description: record.description,
        repairMethod: record.repairMethod,
        materialUsed: record.materialUsed,
        quantityUsed: record.quantityUsed,
        repairStartTime: record.repairStartTime,
        repairEndTime: record.repairEndTime,
        inspector: record.inspector,
        inspectionResult: record.inspectionResult,
        remarks: record.remarks,
      });
    } else {
      setEditingRecord(null);
      setFormData(initialFormData);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecord(null);
    setFormData(initialFormData);
  };

  const handleSave = () => {
    if (editingRecord) {
      setRecords(records.map(r =>
        r.id === editingRecord.id
          ? { ...r, ...formData, updatedAt: new Date() }
          : r
      ));
    } else {
      const newRecord: DefectRecord = {
        id: `DF-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(records.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRecords([...records, newRecord]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      setRecords(records.filter(r => r.id !== recordToDelete));
      setRecordToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          造模作業
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ borderRadius: 1 }}
          >
            篩選
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 1,
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            新增
          </Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>操作</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>日期</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>記錄人</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>缺陷類型</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>位置</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>嚴重程度</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>修補方法</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>開始時間</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>結束時間</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>檢驗結果</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                sx={{
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(record)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(record.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>{record.id}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>{record.recorder}</TableCell>
                <TableCell>{record.defectType}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.severity}</TableCell>
                <TableCell>{record.repairMethod}</TableCell>
                <TableCell>{record.repairStartTime}</TableCell>
                <TableCell>{record.repairEndTime}</TableCell>
                <TableCell>{record.inspectionResult}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="text.secondary">
          共 {records.length} 筆
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRecord ? '編輯造模記錄' : '新增造模記錄'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="日期"
                type="date"
                value={formData.date.toISOString().slice(0, 10)}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="記錄人"
                value={formData.recorder}
                onChange={(e) => setFormData({ ...formData, recorder: e.target.value })}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="缺陷類型"
                select
                value={formData.defectType}
                onChange={(e) => setFormData({ ...formData, defectType: e.target.value })}
                fullWidth
              >
                {DEFECT_TYPES.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="位置"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                fullWidth
              />
              <TextField
                label="嚴重程度"
                select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                fullWidth
              >
                {SEVERITY_LEVELS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                label="描述"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="修補方法"
                select
                value={formData.repairMethod}
                onChange={(e) => setFormData({ ...formData, repairMethod: e.target.value })}
                fullWidth
              >
                {REPAIR_METHODS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="使用材料"
                value={formData.materialUsed}
                onChange={(e) => setFormData({ ...formData, materialUsed: e.target.value })}
                fullWidth
              />
              <TextField
                label="使用量"
                type="number"
                value={formData.quantityUsed}
                onChange={(e) => setFormData({ ...formData, quantityUsed: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="修補開始時間"
                type="time"
                value={formData.repairStartTime}
                onChange={(e) => setFormData({ ...formData, repairStartTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="修補結束時間"
                type="time"
                value={formData.repairEndTime}
                onChange={(e) => setFormData({ ...formData, repairEndTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="檢驗人員"
                value={formData.inspector}
                onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                fullWidth
              />
              <TextField
                label="檢驗結果"
                select
                value={formData.inspectionResult}
                onChange={(e) => setFormData({ ...formData, inspectionResult: e.target.value })}
                fullWidth
              >
                {INSPECTION_RESULTS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="備註"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>確定要刪除此筆記錄嗎？此操作無法復原。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>取消</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

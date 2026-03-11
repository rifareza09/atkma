# 📚 Dokumentasi Lengkap - ATK Mahkamah Agung

## 🤝 Kolaborasi Tim (Mulai dari sini!)

### Untuk Pertanyaan: "Bagaimana cara kerja bersamaan dengan tim?"

**Baca ini terlebih dahulu:**

1. **[CARA_KERJA_TIM.md](../CARA_KERJA_TIM.md)** ⭐⭐⭐
   - Jawaban langsung untuk pertanyaan kolaborasi
   - Setup awal untuk 4 orang tim (Rifa, Aldi, Rendra, Fara)
   - Workflow harian step-by-step
   - Contoh skenario kerja paralel

2. **[GIT_CHEATSHEET.md](GIT_CHEATSHEET.md)** 🖨️
   - Quick reference untuk perintah Git sehari-hari
   - Copy-paste friendly commands
   - Troubleshooting umum
   - **Recommended: Print & tempel di meja!**

3. **[Team Workflow Diagrams](diagrams/team-workflow.md)** 📊
   - Diagram visual workflow tim
   - Timeline kerja harian
   - Ilustrasi branching strategy
   - Mermaid diagrams (bisa lihat di GitHub)

---

## 📖 Panduan Detail

### Git & Kolaborasi

4. **[QUICK_START_GIT.md](QUICK_START_GIT.md)**
   - Setup pertama kali
   - Workflow harian
   - Perintah Git yang sering dipakai
   - Best practices

5. **[GIT_COLLABORATION_GUIDE.md](GIT_COLLABORATION_GUIDE.md)**
   - Panduan lengkap kolaborasi Git/GitHub
   - Branching strategy detail
   - Pull Request workflow
   - Handle merge conflicts
   - VS Code Live Share untuk pair programming

6. **[VISUAL_GIT_GUIDE.md](VISUAL_GIT_GUIDE.md)**
   - Panduan dengan diagram ASCII
   - Timeline kerja tim
   - Visualisasi branch strategy
   - Checklist setup tim

### Development Workflow

7. **[PARALLEL_WORKFLOW.md](PARALLEL_WORKFLOW.md)**
   - Cara FE & BE kerja paralel
   - Contract Types sebagai kesepakatan
   - Mock data untuk FE development
   - Pembagian tugas tim

8. **[TASK_DISTRIBUTION.md](TASK_DISTRIBUTION.md)**
   - Status pekerjaan setiap anggota tim
   - Checklist tugas
   - Priority tasks
   - Next steps

9. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)**
   - Setup development environment
   - Structure project
   - Coding standards
   - Best practices

---

## 🎓 Frontend Development

10. **[FRONTEND_CHEATSHEET.md](FRONTEND_CHEATSHEET.md)**
    - Quick reference untuk FE developer
    - React + TypeScript + Inertia.js
    - shadcn/ui components
    - Common patterns

11. **[FRONTEND_PROGRESS.md](FRONTEND_PROGRESS.md)**
    - Progress FE development
    - Completed features
    - Next tasks

12. **[FRONTEND_1_COMPLETION_REPORT.md](FRONTEND_1_COMPLETION_REPORT.md)**
    - Report lengkap FE 1 completion
    - Deliverables
    - Integration checklist

---

## 🔐 Authentication

13. **[LOGIN_USERNAME_GUIDE.md](LOGIN_USERNAME_GUIDE.md)**
    - Login menggunakan username (bukan email)
    - Setup Fortify configuration
    - Testing credentials

---

## 📊 Diagrams & Visual Aids

### Folder: `diagrams/`

- **[team-workflow.md](diagrams/team-workflow.md)** - Workflow tim dengan Mermaid
- **erd-mermaid.md** - Entity Relationship Diagram
- **erd-dbdiagram.txt** - ERD format dbdiagram.io
- **class-diagram.puml** - Class diagram (PlantUML)
- **sequence-diagram.puml** - Sequence diagram
- **use-case-diagram.puml** - Use case diagram
- **activity-diagram.puml** - Activity diagram

---

## 🎯 Quick Links

### Saya mau...

| Keperluan | Baca Dokumen Ini |
|-----------|------------------|
| Setup project pertama kali | [CARA_KERJA_TIM.md](../CARA_KERJA_TIM.md) atau [README.md](../README.md) |
| Tahu cara kerja bareng | [CARA_KERJA_TIM.md](../CARA_KERJA_TIM.md) |
| Perintah Git harian | [GIT_CHEATSHEET.md](GIT_CHEATSHEET.md) |
| Lihat status tugas | [TASK_DISTRIBUTION.md](TASK_DISTRIBUTION.md) |
| Belajar Git dari nol | [GIT_COLLABORATION_GUIDE.md](GIT_COLLABORATION_GUIDE.md) |
| Pakai Live Share | [GIT_COLLABORATION_GUIDE.md](GIT_COLLABORATION_GUIDE.md) section Live Share |
| Handle conflict | [GIT_CHEATSHEET.md](GIT_CHEATSHEET.md) Troubleshooting |
| Setup FE development | [FRONTEND_CHEATSHEET.md](FRONTEND_CHEATSHEET.md) |
| Lihat diagram DB | [diagrams/erd-mermaid.md](diagrams/erd-mermaid.md) |
| Login credentials | [LOGIN_USERNAME_GUIDE.md](LOGIN_USERNAME_GUIDE.md) atau [README.md](../README.md) |

---

## 📝 Quick Reference

### Login Credentials (Development)

```
Admin:
- Username: admin
- Password: password

Pengawas:
- Username: pengawas
- Password: password
```

### Project Structure

```
atkma/
├── app/               # Laravel backend
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   └── Policies/
├── resources/
│   └── js/           # React frontend
│       ├── pages/
│       ├── components/
│       └── types/
├── database/
│   ├── migrations/
│   └── seeders/
└── docs/             # Documentation (you are here!)
```

### Daily Commands

```bash
# Pagi
git checkout develop
git pull origin develop
git checkout -b feature/my-task

# Kerja & commit
git add .
git commit -m "feat: Add feature"
git push origin feature/my-task

# Malam
# Buat Pull Request di GitHub
```

---

## 🆘 Butuh Bantuan?

1. **Stuck dengan Git?** → Baca [GIT_CHEATSHEET.md](GIT_CHEATSHEET.md) atau [GIT_COLLABORATION_GUIDE.md](GIT_COLLABORATION_GUIDE.md)
2. **Stuck dengan code?** → Pakai VS Code Live Share (lihat [GIT_COLLABORATION_GUIDE.md](GIT_COLLABORATION_GUIDE.md))
3. **Error aplikasi?** → Cek [README.md](../README.md) atau [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
4. **Tanya tim?** → Grup WhatsApp/Telegram

---

## 🎉 Tim ATK Mahkamah Agung

- **Rifa** - Backend Developer 1 (Lead)
- **Aldi** - Frontend Developer 1
- **Rendra** - Backend Developer 2
- **Fara** - Frontend Developer 2

**Mari berkolaborasi dengan efektif!** 🚀

---

**Last updated**: February 2026  
**Repository**: https://github.com/rifareza09/atkma

# Diagram Workflow Tim

## Workflow Paralel - 4 Developer Bekerja Bersamaan

```mermaid
graph TB
    subgraph GitHub["GitHub Repository (rifareza09/atkma)"]
        MAIN[main branch<br/>Production]
        DEV[develop branch<br/>Development]
    end
    
    subgraph Rifa["Rifa - BE 1"]
        RIFA1[feature/be-barang-controller]
        RIFA2[Coding BarangController]
        RIFA3[Commit & Push]
        RIFA4[Pull Request]
    end
    
    subgraph Aldi["Aldi - FE 1"]
        ALDI1[feature/fe-barang-pages]
        ALDI2[Coding Barang Pages]
        ALDI3[Commit & Push]
        ALDI4[Pull Request]
    end
    
    subgraph Rendra["Rendra - BE 2"]
        RENDRA1[feature/be-ruangan-controller]
        RENDRA2[Coding RuanganController]
        RENDRA3[Commit & Push]
        RENDRA4[Pull Request]
    end
    
    subgraph Fara["Fara - FE 2"]
        FARA1[feature/fe-dashboard]
        FARA2[Coding Dashboard]
        FARA3[Commit & Push]
        FARA4[Pull Request]
    end
    
    subgraph Review["Code Review & Integration"]
        REVIEW[Team Review PRs]
        MERGE[Merge to develop]
        SYNC[All team pulls develop]
    end
    
    MAIN --> DEV
    
    DEV --> RIFA1
    DEV --> ALDI1
    DEV --> RENDRA1
    DEV --> FARA1
    
    RIFA1 --> RIFA2 --> RIFA3 --> RIFA4
    ALDI1 --> ALDI2 --> ALDI3 --> ALDI4
    RENDRA1 --> RENDRA2 --> RENDRA3 --> RENDRA4
    FARA1 --> FARA2 --> FARA3 --> FARA4
    
    RIFA4 --> REVIEW
    ALDI4 --> REVIEW
    RENDRA4 --> REVIEW
    FARA4 --> REVIEW
    
    REVIEW --> MERGE
    MERGE --> DEV
    DEV --> SYNC
    
    SYNC -.Update.-> RIFA1
    SYNC -.Update.-> ALDI1
    SYNC -.Update.-> RENDRA1
    SYNC -.Update.-> FARA1
    
    style MAIN fill:#ff6b6b
    style DEV fill:#4ecdc4
    style REVIEW fill:#95e1d3
    style MERGE fill:#95e1d3
    style SYNC fill:#95e1d3
```

## Timeline Kerja Harian

```mermaid
gantt
    title Workflow Harian Tim (Contoh)
    dateFormat HH:mm
    axisFormat %H:%M
    
    section Setup
    Pull develop latest    :09:00, 15m
    
    section Rifa (BE 1)
    Create branch BE        :09:15, 10m
    Coding BarangController :09:25, 3h
    Commit & Push          :12:25, 10m
    Coding lanjutan        :13:00, 3h
    Final commit & PR      :16:00, 15m
    
    section Aldi (FE 1)
    Create branch FE        :09:15, 10m
    Coding Barang Pages    :09:25, 3h
    Commit & Push          :12:25, 10m
    Coding lanjutan        :13:00, 3h
    Final commit & PR      :16:00, 15m
    
    section Rendra (BE 2)
    Create branch BE2       :09:15, 10m
    Coding RuanganController:09:25, 3h
    Commit & Push          :12:25, 10m
    Coding lanjutan        :13:00, 3h
    Final commit & PR      :16:00, 15m
    
    section Fara (FE 2)
    Create branch FE2       :09:15, 10m
    Coding Dashboard       :09:25, 3h
    Commit & Push          :12:25, 10m
    Coding lanjutan        :13:00, 3h
    Final commit & PR      :16:00, 15m
    
    section Review
    Team Code Review       :16:15, 45m
    Merge PRs              :17:00, 30m
    All sync develop       :17:30, 15m
```

## Keuntungan Workflow Ini

```mermaid
mindmap
  root((Git Branching<br/>Workflow))
    Kerja Paralel
      Tidak tunggu teman
      4 orang coding bersamaan
      Produktivitas tinggi
    Backup Otomatis
      Code aman di GitHub
      Tidak hilang
      Bisa rollback
    Code Quality
      Review sebelum merge
      Diskusi di PR
      Belajar dari teman
    Conflict Minimal
      Branch terpisah
      Merge terkelola
      Easy resolve
    History Jelas
      Siapa ubah apa
      Kapan diubah
      Kenapa diubah
```

## Branch Strategy

```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Setup foundation"
    
    branch feature/be-barang-controller
    checkout feature/be-barang-controller
    commit id: "BE: Add BarangController"
    commit id: "BE: Add validation"
    
    checkout develop
    branch feature/fe-barang-pages
    checkout feature/fe-barang-pages
    commit id: "FE: Add Index page"
    commit id: "FE: Add Create page"
    
    checkout develop
    branch feature/be-ruangan-controller
    checkout feature/be-ruangan-controller
    commit id: "BE: Add RuanganController"
    
    checkout develop
    branch feature/fe-dashboard
    checkout feature/fe-dashboard
    commit id: "FE: Add Dashboard"
    commit id: "FE: Add stats cards"
    
    checkout develop
    merge feature/be-barang-controller tag: "PR #1 merged"
    merge feature/fe-barang-pages tag: "PR #2 merged"
    merge feature/be-ruangan-controller tag: "PR #3 merged"
    merge feature/fe-dashboard tag: "PR #4 merged"
    
    checkout main
    merge develop tag: "v1.0.0"
```

## Conflict Resolution Flow

```mermaid
flowchart TD
    A[Push Code] --> B{Conflict?}
    B -->|No| C[Success!]
    B -->|Yes| D[git status]
    D --> E[Open conflict file in VS Code]
    E --> F{Choose resolution}
    F -->|Keep yours| G[Delete other code]
    F -->|Keep theirs| H[Delete your code]
    F -->|Merge both| I[Combine both codes]
    G --> J[Remove conflict markers]
    H --> J
    I --> J
    J --> K[git add .]
    K --> L[git commit]
    L --> M[git push]
    M --> C
    
    style C fill:#95e1d3
    style B fill:#ffe66d
    style F fill:#ffe66d
```

---

**Catatan**: 
- Diagram ini dibuat dengan Mermaid syntax
- Bisa dilihat langsung di GitHub atau VS Code dengan Mermaid extension
- Untuk export ke PNG/SVG, bisa pakai https://mermaid.live

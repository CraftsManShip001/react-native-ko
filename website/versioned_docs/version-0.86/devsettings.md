---
id: devsettings
title: DevSettings
---

`DevSettings` 모듈은 개발 환경에서 개발자 설정을 커스터마이징할 수 있는 메서드를 제공합니다.

---

# 레퍼런스

## 메서드

### `addMenuItem()`

```tsx
static addMenuItem(title: string, handler: () => any);
```

Dev Menu에 커스텀 메뉴 항목을 추가합니다.

**매개변수:**

| Name                                                         | Type     |
| ------------------------------------------------------------ | -------- |
| title <div className="label basic required">Required</div>   | string   |
| handler <div className="label basic required">Required</div> | function |

**예시:**

```tsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

---

### `reload()`

```tsx
static reload(reason?: string): void;
```

애플리케이션을 리로드합니다. 직접 호출하거나 사용자 인터랙션 시 호출할 수 있습니다.

**예시:**

```tsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

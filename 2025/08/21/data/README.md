# Data

*GitHub GraphQL API Explorer*

- https://docs.github.com/en/graphql/overview/explorer

*Query*

```
query {
  viewer {
      contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
        }
      }
    }
  }
}
```

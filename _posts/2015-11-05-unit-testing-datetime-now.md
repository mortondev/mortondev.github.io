---
layout: post
title: Unit Testing with NodaTime
---

When trying to test code which uses DateTime.Now, it can be challenging to test time-based scenarios as by default your stuck with the current system time. Ideally we want to be able to be able to change the current time to give us more freedom when testing.

My solution to testing the current time involves injecting an IClock interface into the classes that require DateTime.Now. By doing this it becomes a simple case of mocking the interface to return whatever time you require, allowing you simulate time-based scenarios.

## Testing With NodaTime

Instead of reinventing the wheel we're going to use [NodaTime](http://nodatime.org), a mature library which offers an alternative to the standard date and time API offered by .NET.

Firstly you need to install NodaTime and NodaTime.Testing nuget packages:

```
Install-Package NodaTime
Install-Package NodaTime.Testing
```

NodaTime provides us with an IClock interface from which we can query the current date and time. NodaTime.Testing gives you access to a FakeClock implementation which allows you provide a static time in the constructor that will always be returned for that instance of IClock.

### Code Example

First up we have a simple Widget class and WidgetFactory to produce our widgets.

```csharp
public class Widget {
  public Guid WidgetId { get; set; }
  public DateTime CreatedOn { get; set; }
}

public class WidgetFactory {
  private IClock _clock;

  public WidgetFactory(IClock clock) {
    _clock = clock;
  }

  public Widget Create() {
    return new Widget() {
      WidgetId = Guid.NewGuid(),
      CreatedOn = _clock.Now.ToDateTimeUtc()
    };
  }
}
```

And now for a test to prove that our CreatedOn date is set according to the current time, which has been faked to a specific point in time.

```csharp
[TestFixture]
public class WidgetFactoryTests {

  [Test]
  public void CreatedOn_Set_To_2015_01_01() {
    var clock = new FakeClock(Instant.FromUtc(2015, 1, 1, 0, 0));
    var widgetFactory = new WidgetFactory(clock);
    var widget = widgetFactory.Create();

    Assert.AreEqual(new DateTime(2015, 1, 1), widget.CreatedOn);
  }
}
```
